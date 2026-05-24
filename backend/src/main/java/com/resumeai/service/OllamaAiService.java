package com.resumeai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeai.dto.ResumeDTO;
import com.resumeai.exception.AiServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class OllamaAiService {

    private static final Logger logger = LoggerFactory.getLogger(OllamaAiService.class);

    @Autowired
    private RestTemplate restTemplate;

    @Value("${ollama.base-url}")
    private String ollamaBaseUrl;

    @Value("${ollama.model}")
    private String ollamaModel;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String generateResume(ResumeDTO.GenerateRequest request) {
        String prompt = buildPrompt(request);
        try {
            return callOllama(prompt);
        } catch (Exception e) {
            logger.warn("Ollama unavailable or failed — falling back to local generator: {}", e.getMessage());
            return generateFallbackResume(request);
        }
    }

    private String buildPrompt(ResumeDTO.GenerateRequest req) {
        return String.format("""
            You are an expert ATS-optimized resume writer. Generate a COMPLETE, PROFESSIONAL resume for the following candidate.
            
            CANDIDATE DETAILS:
            - Full Name: %s
            - Email: %s
            - Phone: %s
            - Location: %s
            - Target Job Role: %s
            - Years of Experience: %s
            - LinkedIn: %s
            - GitHub: %s
            
            SKILLS PROVIDED:
            %s
            
            WORK EXPERIENCE:
            %s
            
            EDUCATION:
            %s
            
            PROJECTS:
            %s
            
            CERTIFICATIONS:
            %s
            
            ACHIEVEMENTS:
            %s
            
            INSTRUCTIONS:
            1. Generate a complete ATS-optimized resume in clean text format.
            2. Include all sections: Professional Summary, Skills, Work Experience, Projects, Education, Certifications.
            3. Use strong action verbs and quantifiable achievements.
            4. Include relevant ATS keywords for the target job role: %s.
            5. Format with clear section headers using === delimiters.
            6. Make it professional and ready to submit to top tech companies.
            7. Expand and enhance the provided information professionally.
            8. Do NOT include any commentary or explanation — only the resume content.
            
            Generate the complete resume now:
            """,
                req.getFullName(),
                req.getEmail(),
                req.getPhone() != null ? req.getPhone() : "Not provided",
                req.getLocation() != null ? req.getLocation() : "Not provided",
                req.getJobRole(),
                req.getYearsOfExperience() != null ? req.getYearsOfExperience() : "Not specified",
                req.getLinkedIn() != null ? req.getLinkedIn() : "Not provided",
                req.getGithub() != null ? req.getGithub() : "Not provided",
                req.getSkills() != null ? req.getSkills() : "Not provided",
                req.getExperience() != null ? req.getExperience() : "Not provided",
                req.getEducation() != null ? req.getEducation() : "Not provided",
                req.getProjects() != null ? req.getProjects() : "Not provided",
                req.getCertifications() != null ? req.getCertifications() : "None",
                req.getAchievements() != null ? req.getAchievements() : "None",
                req.getJobRole()
        );
    }

    private String callOllama(String prompt) {
        try {
            String url = ollamaBaseUrl + "/api/generate";

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", ollamaModel);
            requestBody.put("prompt", prompt);
            requestBody.put("stream", false);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            logger.info("Calling Ollama AI with model: {}", ollamaModel);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode jsonNode = objectMapper.readTree(response.getBody());
                String generatedText = jsonNode.path("response").asText();
                return cleanResumeText(generatedText);
            } else {
                throw new AiServiceException("Ollama returned an unexpected response");
            }
        } catch (AiServiceException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Failed to connect to Ollama: {}", e.getMessage());
            throw new AiServiceException("AI service is unavailable. Please ensure Ollama is running with the DeepSeek model. Error: " + e.getMessage(), e);
        }
    }

    private String cleanResumeText(String text) {
        if (text == null) return "";
        // Remove any <think> tags that DeepSeek might produce
        text = text.replaceAll("(?s)<think>.*?</think>", "").trim();
        // Normalize excessive newlines
        text = text.replaceAll("\n{3,}", "\n\n");
        return text.trim();
    }

    private String generateFallbackResume(ResumeDTO.GenerateRequest req) {
        StringBuilder sb = new StringBuilder();
        sb.append("=== PROFESSIONAL SUMMARY ===\n");
        sb.append(req.getFullName() != null ? req.getFullName() + " — " : "Candidate — ");
        sb.append("Experienced professional targeting ");
        sb.append(req.getJobRole() != null ? req.getJobRole() : "the specified role");
        sb.append(".\n\n");

        sb.append("=== SKILLS ===\n");
        sb.append(req.getSkills() != null ? req.getSkills() : "Not provided");
        sb.append("\n\n");

        sb.append("=== WORK EXPERIENCE ===\n");
        sb.append(req.getExperience() != null ? req.getExperience() : "No detailed experience provided. Use this section to list past roles and achievements.");
        sb.append("\n\n");

        sb.append("=== PROJECTS ===\n");
        sb.append(req.getProjects() != null ? req.getProjects() : "None listed");
        sb.append("\n\n");

        sb.append("=== EDUCATION ===\n");
        sb.append(req.getEducation() != null ? req.getEducation() : "Not provided");
        sb.append("\n\n");

        sb.append("=== CERTIFICATIONS ===\n");
        sb.append(req.getCertifications() != null ? req.getCertifications() : "None");
        sb.append("\n\n");

        sb.append("=== ACHIEVEMENTS ===\n");
        sb.append(req.getAchievements() != null ? req.getAchievements() : "None");
        sb.append("\n\n");

        sb.append("=== INSTRUCTIONS ===\n");
        sb.append("This is a locally generated fallback resume. Replace with content produced by the AI when Ollama is available.");

        return sb.toString();
    }
}
