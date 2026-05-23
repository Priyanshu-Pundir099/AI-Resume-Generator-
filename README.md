#  AI Resume Generator

> A full-stack, production-ready AI-powered resume generator built with **Spring Boot**, **React**, and **DeepSeek LLM** via **Ollama**.

![Tech Stack](https://img.shields.io/badge/Backend-Spring%20Boot%203.2-green)
![Tech Stack](https://img.shields.io/badge/Frontend-React%2018-blue)
![Tech Stack](https://img.shields.io/badge/AI-DeepSeek%20%2B%20Ollama-purple)
![Tech Stack](https://img.shields.io/badge/Database-MySQL-orange)
![Tech Stack](https://img.shields.io/badge/Auth-JWT-red)

---

## Features

-  **Secure Authentication** — JWT-based register/login with BCrypt password hashing
-  **AI Resume Generation** — DeepSeek LLM via Ollama creates ATS-optimized resumes
-  **Live Preview** — See your formatted resume instantly after generation
-  **PDF Export** — One-click download as a professionally formatted PDF
-  **Resume History** — Save and manage multiple resumes per user
-  **Dashboard** — Overview of all your generated resumes
-  **Modern UI** — Dark-themed, responsive SaaS-style design with Tailwind CSS
-  **Protected Routes** — Frontend and backend route protection

---

## Architecture

```
ai-resume-generator/
├── backend/                    # Spring Boot REST API
│   └── src/main/java/com/resumeai/
│       ├── config/             # Security & App config
│       ├── controller/         # REST controllers
│       ├── dto/                # Data Transfer Objects
│       ├── entity/             # JPA Entities
│       ├── exception/          # Global exception handling
│       ├── repository/         # JPA Repositories
│       ├── security/           # JWT + UserDetails
│       └── service/            # Business logic + AI service
├── frontend/                   # React SPA
│   └── src/
│       ├── api/                # Axios API layer
│       ├── components/         # Reusable components
│       ├── context/            # Auth context (React Context API)
│       └── pages/              # Route pages
└── schema.sql                  # MySQL schema (optional, auto-created)
```

### Backend Flow

```
React → Axios → Spring Controller → Service → OllamaAiService → DeepSeek LLM
                                          ↓
                                    MySQL (JPA/Hibernate)
                                          ↓
                                    JSON Response → React
```

---

## Tech Stack

| Layer        | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend     | React 18, Tailwind CSS, Axios, React Router v6  |
| Backend      | Spring Boot 3.2, Spring Security, Spring JPA    |
| AI           | Ollama + DeepSeek R1 1.5B (or larger)           |
| Database     | MySQL 8.x                                        |
| Auth         | JWT (jjwt 0.11.5) + BCryptPasswordEncoder        |
| PDF          | html2pdf.js (client-side)                        |

---

## Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.x
- Maven 3.8+
- [Ollama](https://ollama.com) installed and running

---

## MySQL Setup

```sql
-- Option 1: Auto-created by Spring Boot on first run (recommended)
-- Just ensure MySQL is running and credentials match application.properties

-- Option 2: Manual setup
CREATE DATABASE resume_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Then run schema.sql
```

Update `backend/src/main/resources/application.properties` with your credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/resume_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## Ollama + DeepSeek Setup

```bash
# 1. Install Ollama from https://ollama.com

# 2. Pull the DeepSeek model
ollama pull deepseek-r1:1.5b

# 3. Verify it's running
ollama list

# 4. Ollama runs on http://localhost:11434 by default
```

> You can use a larger model (e.g., `deepseek-r1:7b`) for better quality by updating `ollama.model` in `application.properties`.

---

## Running the Project

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

API runs at: `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm start
```

App runs at: `http://localhost:3000`

---


## Future Improvements

- [ ] Multiple resume templates (modern, classic, minimal)
- [ ] AI resume scoring against job descriptions
- [ ] LinkedIn profile import
- [ ] Resume comparison tool
- [ ] Email verified registration
- [ ] Google OAuth integration
- [ ] Docker Compose for full containerization
- [ ] Resume analytics dashboard

---

## Complete Project Structure

```
ai-resume-generator/
├── .gitignore
├── README.md
├── schema.sql
├── backend/
│   ├── .gitignore
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/resumeai/
│       │   ├── AiResumeGeneratorApplication.java
│       │   ├── config/
│       │   │   ├── AppConfig.java
│       │   │   └── SecurityConfig.java
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   └── ResumeController.java
│       │   ├── dto/
│       │   │   ├── ApiResponse.java
│       │   │   ├── AuthDTO.java
│       │   │   └── ResumeDTO.java
│       │   ├── entity/
│       │   │   ├── Resume.java
│       │   │   └── User.java
│       │   ├── exception/
│       │   │   ├── AiServiceException.java
│       │   │   ├── GlobalExceptionHandler.java
│       │   │   ├── ResourceNotFoundException.java
│       │   │   └── UserAlreadyExistsException.java
│       │   ├── repository/
│       │   │   ├── ResumeRepository.java
│       │   │   └── UserRepository.java
│       │   ├── security/
│       │   │   ├── JwtAuthenticationFilter.java
│       │   │   ├── JwtUtils.java
│       │   │   ├── UserDetailsImpl.java
│       │   │   └── UserDetailsServiceImpl.java
│       │   └── service/
│       │       ├── AuthService.java
│       │       ├── OllamaAiService.java
│       │       └── ResumeService.java
│       └── resources/
│           └── application.properties
└── frontend/
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── index.css
        ├── api/
        │   └── index.js
        ├── components/
        │   ├── Loader.js
        │   ├── Navbar.js
        │   ├── PreviewPanel.js
        │   ├── ProtectedRoute.js
        │   └── ResumeForm.js
        ├── context/
        │   └── AuthContext.js
        └── pages/
            ├── Builder.js
            ├── Dashboard.js
            ├── Landing.js
            ├── Login.js
            └── Register.js
```

---

## Author: Priyanshu Pundir

Built with ❤️ using Spring Boot, React, and DeepSeek AI.

---

