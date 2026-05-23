import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Feature = ({ icon, title, desc }) => (
  <div className="card group hover:border-brand-500/30 transition-all duration-300">
    <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-brand-500/20 transition-colors">
      {icon}
    </div>
    <h3 className="font-display font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const Landing = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    { icon: '🤖', title: 'DeepSeek AI Engine', desc: 'Powered by DeepSeek LLM via Ollama for intelligent, context-aware resume generation.' },
    { icon: '📄', title: 'ATS-Optimized', desc: 'Every resume is crafted with keywords and formatting that pass Applicant Tracking Systems.' },
    { icon: '⚡', title: 'Instant Generation', desc: 'Input your details and get a complete professional resume in under 60 seconds.' },
    { icon: '💾', title: 'Save & Manage', desc: 'Keep all your generated resumes organized in one dashboard, ready to access anytime.' },
    { icon: '📥', title: 'PDF Export', desc: 'One-click download of your resume as a professionally formatted PDF document.' },
    { icon: '🔒', title: 'Secure & Private', desc: 'JWT authentication ensures your data is protected and accessible only to you.' },
  ];

  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium px-4 py-1.5 rounded-full mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
            Powered by DeepSeek AI + Ollama
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6 animate-slide-up">
            Build resumes that
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">
              land interviews
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            Generate ATS-optimized, professionally crafted resumes in seconds using the power of DeepSeek AI.
            Stand out from the competition with intelligent, tailored content.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link
              to={isAuthenticated ? '/builder' : '/register'}
              className="btn-primary text-base py-3.5 px-8 w-full sm:w-auto"
            >
              {isAuthenticated ? 'Build a Resume' : 'Start for Free'}
            </Link>
            <Link to="/login" className="btn-secondary text-base py-3.5 px-8 w-full sm:w-auto">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-white mb-3">Everything you need</h2>
            <p className="text-slate-400">A complete AI-powered resume platform built for modern job seekers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => <Feature key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card border-brand-500/20 bg-gradient-to-br from-brand-500/5 to-blue-600/5">
            <h2 className="font-display font-bold text-3xl text-white mb-3">
              Ready to land your dream job?
            </h2>
            <p className="text-slate-400 mb-6">
              Join thousands of professionals using AI to build standout resumes.
            </p>
            <Link to={isAuthenticated ? '/builder' : '/register'} className="btn-primary text-base py-3 px-8">
              {isAuthenticated ? 'Build Now →' : 'Get Started Free →'}
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-surface-800 py-8 px-4 text-center text-slate-500 text-sm">
        © 2024 ResumeAI · Built with Spring Boot + React + DeepSeek
      </footer>
    </div>
  );
};

export default Landing;
