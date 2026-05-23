import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resumeApi } from '../api';
import PreviewPanel from '../components/PreviewPanel';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const ResumeCard = ({ resume, onView, onDelete }) => (
  <div className="card group hover:border-surface-600 transition-all duration-200 animate-fade-in">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center">
        <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <span className="text-xs text-slate-500 font-mono">
        {new Date(resume.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </span>
    </div>
    <h3 className="font-display font-semibold text-white mb-1 truncate">{resume.jobRole}</h3>
    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
      {resume.content?.substring(0, 100)}...
    </p>
    <div className="flex gap-2">
      <button onClick={() => onView(resume)} className="flex-1 btn-secondary text-sm py-2">
        Preview
      </button>
      <button onClick={() => onDelete(resume.id)} className="btn-danger text-sm py-2 px-3">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
);

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data } = await resumeApi.getAll();
      if (data.success) setResumes(data.data);
    } catch {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resume?')) return;
    try {
      await resumeApi.delete(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
      if (selectedResume?.id === id) setSelectedResume(null);
      toast.success('Resume deleted');
    } catch {
      toast.error('Failed to delete resume');
    }
  };

  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar />
      <div className="pt-16">
        {selectedResume ? (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <PreviewPanel resume={selectedResume} onBack={() => setSelectedResume(null)} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display font-bold text-2xl text-white">
                  Welcome back, {user?.name?.split(' ')[0]} 👋
                </h1>
                <p className="text-slate-400 mt-1">
                  {resumes.length} resume{resumes.length !== 1 ? 's' : ''} saved
                </p>
              </div>
              <Link to="/builder" className="btn-primary flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Resume
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Total Resumes', value: resumes.length, icon: '📄' },
                { label: 'This Month', value: resumes.filter(r => new Date(r.createdAt).getMonth() === new Date().getMonth()).length, icon: '📅' },
                { label: 'Job Roles', value: [...new Set(resumes.map(r => r.jobRole))].length, icon: '🎯' },
              ].map((stat) => (
                <div key={stat.label} className="card">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <div>
                      <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                      <p className="text-slate-400 text-xs">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resume Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="font-display font-bold text-xl text-white mb-2">No resumes yet</h3>
                <p className="text-slate-400 mb-6">Create your first AI-powered resume to get started</p>
                <Link to="/builder" className="btn-primary">Build Your First Resume</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume}
                    onView={setSelectedResume} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
