import React, { useState } from 'react';
import { resumeApi } from '../api';
import toast from 'react-hot-toast';
import Loader from './Loader';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  jobRole: '',
  yearsOfExperience: '',
  linkedIn: '',
  github: '',
  skills: '',
  experience: '',
  education: '',
  projects: '',
  certifications: '',
  achievements: '',
};

const FormSection = ({ title, icon, children }) => (
  <div className="card animate-fade-in">
    <div className="flex items-center gap-2 mb-5">
      <span className="text-xl">{icon}</span>
      <h3 className="font-display font-semibold text-white">{title}</h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const ResumeForm = ({ onGenerated }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.jobRole) {
      toast.error('Please fill in the required fields');
      return;
    }
    setLoading(true);
    try {
      const { data } = await resumeApi.generate(formData);
      if (data.success) {
        onGenerated(data.data);
        toast.success('Resume generated successfully!');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to generate resume. Is Ollama running?';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormSection title="Personal Information" icon="👤">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name *</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange}
              className="input-field" placeholder="John Doe" required />
          </div>
          <div>
            <label className="label">Email *</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange}
              className="input-field" placeholder="john@example.com" required />
          </div>
          <div>
            <label className="label">Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange}
              className="input-field" placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label className="label">Location</label>
            <input name="location" value={formData.location} onChange={handleChange}
              className="input-field" placeholder="San Francisco, CA" />
          </div>
          <div>
            <label className="label">LinkedIn</label>
            <input name="linkedIn" value={formData.linkedIn} onChange={handleChange}
              className="input-field" placeholder="linkedin.com/in/johndoe" />
          </div>
          <div>
            <label className="label">GitHub</label>
            <input name="github" value={formData.github} onChange={handleChange}
              className="input-field" placeholder="github.com/johndoe" />
          </div>
        </div>
      </FormSection>

      <FormSection title="Target Role" icon="🎯">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Job Role *</label>
            <input name="jobRole" value={formData.jobRole} onChange={handleChange}
              className="input-field" placeholder="Senior Full Stack Engineer" required />
          </div>
          <div>
            <label className="label">Years of Experience</label>
            <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange}
              className="input-field">
              <option value="">Select experience</option>
              <option value="0-1 years (Fresher)">0-1 years (Fresher)</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5-8 years">5-8 years</option>
              <option value="8-12 years">8-12 years</option>
              <option value="12+ years">12+ years</option>
            </select>
          </div>
        </div>
      </FormSection>

      <FormSection title="Skills" icon="⚡">
        <div>
          <label className="label">Technical & Soft Skills</label>
          <textarea name="skills" value={formData.skills} onChange={handleChange}
            className="input-field resize-none" rows={3}
            placeholder="React, Node.js, TypeScript, AWS, Docker, PostgreSQL, Problem Solving, Team Leadership..." />
          <p className="text-xs text-slate-500 mt-1">List all relevant skills separated by commas</p>
        </div>
      </FormSection>

      <FormSection title="Work Experience" icon="💼">
        <div>
          <label className="label">Describe your work experience</label>
          <textarea name="experience" value={formData.experience} onChange={handleChange}
            className="input-field resize-none" rows={5}
            placeholder="Company: TechCorp Inc., Role: Software Engineer, Duration: 2021-2024&#10;- Built REST APIs serving 10M+ requests/day&#10;- Led a team of 5 engineers&#10;- Reduced deployment time by 40%" />
        </div>
      </FormSection>

      <FormSection title="Education" icon="🎓">
        <div>
          <label className="label">Educational Background</label>
          <textarea name="education" value={formData.education} onChange={handleChange}
            className="input-field resize-none" rows={3}
            placeholder="B.Tech in Computer Science, MIT, 2019-2023, GPA: 3.8/4.0" />
        </div>
      </FormSection>

      <FormSection title="Projects" icon="🚀">
        <div>
          <label className="label">Key Projects</label>
          <textarea name="projects" value={formData.projects} onChange={handleChange}
            className="input-field resize-none" rows={4}
            placeholder="Project: E-Commerce Platform&#10;- Built with React + Node.js&#10;- 50K+ active users&#10;- GitHub: github.com/johndoe/project" />
        </div>
      </FormSection>

      <FormSection title="Certifications & Achievements" icon="🏆">
        <div>
          <label className="label">Certifications</label>
          <textarea name="certifications" value={formData.certifications} onChange={handleChange}
            className="input-field resize-none" rows={2}
            placeholder="AWS Solutions Architect, Google Cloud Professional, Meta React Developer..." />
        </div>
        <div>
          <label className="label">Achievements</label>
          <textarea name="achievements" value={formData.achievements} onChange={handleChange}
            className="input-field resize-none" rows={2}
            placeholder="Hackathon Winner 2023, Open Source Contributor, Published 3 tech articles..." />
        </div>
      </FormSection>

      <button type="submit" className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Generate AI Resume
      </button>
    </form>
  );
};

export default ResumeForm;
