package com.resumeai.service;

import com.resumeai.dto.ResumeDTO;
import com.resumeai.entity.Resume;
import com.resumeai.entity.User;
import com.resumeai.exception.ResourceNotFoundException;
import com.resumeai.repository.ResumeRepository;
import com.resumeai.repository.UserRepository;
import com.resumeai.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OllamaAiService ollamaAiService;

    @Transactional
    public ResumeDTO.ResumeResponse generateAndSave(ResumeDTO.GenerateRequest request) {
        Long userId = getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Call AI service to generate resume content
        String generatedContent = ollamaAiService.generateResume(request);

        Resume resume = Resume.builder()
                .user(user)
                .jobRole(request.getJobRole())
                .content(generatedContent)
                .build();

        resume = resumeRepository.save(resume);
        return mapToResponse(resume);
    }

    public List<ResumeDTO.ResumeResponse> getAllResumes() {
        Long userId = getCurrentUserId();
        return resumeRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ResumeDTO.ResumeResponse getResumeById(Long id) {
        Long userId = getCurrentUserId();
        Resume resume = resumeRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found with id: " + id));
        return mapToResponse(resume);
    }

    @Transactional
    public void deleteResume(Long id) {
        Long userId = getCurrentUserId();
        Resume resume = resumeRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found with id: " + id));
        resumeRepository.delete(resume);
    }

    private Long getCurrentUserId() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        return userDetails.getId();
    }

    private ResumeDTO.ResumeResponse mapToResponse(Resume resume) {
        return new ResumeDTO.ResumeResponse(
                resume.getId(),
                resume.getJobRole(),
                resume.getContent(),
                resume.getCreatedAt()
        );
    }
}
