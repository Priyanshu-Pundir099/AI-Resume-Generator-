import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ResumeForm from '../components/ResumeForm';
import PreviewPanel from '../components/PreviewPanel';
import { Link } from 'react-router-dom';

const Builder = () => {
  const [generatedResume, setGeneratedResume] = useState(null);

  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-2xl text-white">Resume Builder</h1>
              <p className="text-slate-400 text-sm mt-1">
                Fill in your details and let DeepSeek AI create your perfect resume
              </p>
            </div>
            <Link to="/dashboard" className="btn-secondary text-sm py-2 px-4">
              My Resumes →
            </Link>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left: Form */}
            <div className="overflow-y-auto">
              <ResumeForm onGenerated={(resume) => setGeneratedResume(resume)} />
            </div>

            {/* Right: Preview */}
            <div className="xl:sticky xl:top-20 xl:h-[calc(100vh-6rem)]">
              {generatedResume ? (
                <PreviewPanel resume={generatedResume} />
              ) : (
                <div className="card h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 bg-surface-800 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-slate-400 text-lg mb-2">
                    Preview will appear here
                  </h3>
                  <p className="text-slate-600 text-sm max-w-xs">
                    Fill in the form on the left and click "Generate AI Resume" to see your professional resume
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-brand-500/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500/50 animate-pulse" />
                    <span className="text-xs font-mono">Waiting for input...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
