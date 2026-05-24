package com.resumeai.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MockOllamaController {

    @PostMapping("/mock/ollama/api/generate")
    public ResponseEntity<Map<String, Object>> generate(@RequestBody Map<String, Object> body) {
        String model = (String) body.getOrDefault("model", "unknown-model");
        String prompt = (String) body.getOrDefault("prompt", "");

        // Very small mock: return a short generated resume using parts of the prompt
        String summary = "MOCK RESUME (model=" + model + ")\n\n";
        String candidateLine = "Candidate details not found in prompt.";
        if (prompt != null) {
            int idx = prompt.indexOf("CANDIDATE DETAILS:");
            if (idx >= 0) {
                String snippet = prompt.substring(idx);
                // limit length
                candidateLine = snippet.length() > 800 ? snippet.substring(0, 800) + "..." : snippet;
            } else {
                candidateLine = prompt.length() > 800 ? prompt.substring(0, 800) + "..." : prompt;
            }
        }

        String generated = summary + candidateLine + "\n\n(This is a mocked response — replace with real Ollama output.)";

        Map<String, Object> resp = new HashMap<>();
        resp.put("response", generated);
        return ResponseEntity.ok(resp);
    }
}
