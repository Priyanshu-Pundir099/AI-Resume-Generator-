package com.resumeai.controller;

import com.resumeai.dto.ApiResponse;
import com.resumeai.dto.ResumeDTO;
import com.resumeai.service.ResumeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/generate")
    public ResponseEntity<ApiResponse<ResumeDTO.ResumeResponse>> generateResume(
            @Valid @RequestBody ResumeDTO.GenerateRequest request) {
        ResumeDTO.ResumeResponse response = resumeService.generateAndSave(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Resume generated successfully", response));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<ResumeDTO.ResumeResponse>>> getAllResumes() {
        List<ResumeDTO.ResumeResponse> resumes = resumeService.getAllResumes();
        return ResponseEntity.ok(ApiResponse.success("Resumes fetched successfully", resumes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ResumeDTO.ResumeResponse>> getResumeById(@PathVariable Long id) {
        ResumeDTO.ResumeResponse resume = resumeService.getResumeById(id);
        return ResponseEntity.ok(ApiResponse.success("Resume fetched successfully", resume));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
        return ResponseEntity.ok(ApiResponse.success("Resume deleted successfully", null));
    }
}
