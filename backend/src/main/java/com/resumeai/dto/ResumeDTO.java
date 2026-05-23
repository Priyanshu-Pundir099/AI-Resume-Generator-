package com.resumeai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

public class ResumeDTO {

    @Data
    public static class GenerateRequest {
        @NotBlank(message = "Full name is required")
        private String fullName;

        @NotBlank(message = "Email is required")
        private String email;

        private String phone;
        private String location;

        @NotBlank(message = "Job role is required")
        private String jobRole;

        private String yearsOfExperience;
        private String skills;
        private String experience;
        private String education;
        private String projects;
        private String certifications;
        private String achievements;
        private String linkedIn;
        private String github;
    }

    @Data
    public static class ResumeResponse {
        private Long id;
        private String jobRole;
        private String content;
        private LocalDateTime createdAt;

        public ResumeResponse(Long id, String jobRole, String content, LocalDateTime createdAt) {
            this.id = id;
            this.jobRole = jobRole;
            this.content = content;
            this.createdAt = createdAt;
        }
    }
}
