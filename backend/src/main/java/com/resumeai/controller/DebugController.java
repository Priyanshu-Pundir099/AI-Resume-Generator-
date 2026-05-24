package com.resumeai.controller;

import com.resumeai.dto.ResumeDTO;
import com.resumeai.service.OllamaAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @Autowired
    private OllamaAiService ollamaAiService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateNoAuth(@RequestBody ResumeDTO.GenerateRequest request) {
        String result = ollamaAiService.generateResume(request);
        return ResponseEntity.ok(result);
    }
}
