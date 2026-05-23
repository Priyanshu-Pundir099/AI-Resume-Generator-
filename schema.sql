-- ============================================================
-- AI Resume Generator - MySQL Schema
-- ============================================================
-- Run this manually ONLY if you prefer manual setup.
-- Spring Boot will auto-create tables via spring.jpa.hibernate.ddl-auto=update
-- ============================================================

CREATE DATABASE IF NOT EXISTS resume_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE resume_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)        NOT NULL,
    email       VARCHAR(255)        NOT NULL UNIQUE,
    password    VARCHAR(255)        NOT NULL,
    created_at  DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT              NOT NULL,
    job_role    VARCHAR(255)        NOT NULL,
    content     LONGTEXT            NOT NULL,
    created_at  DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_resumes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
