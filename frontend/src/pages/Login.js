import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authApi.login(formData);
      if (data.success) {
        login(data.data);
        toast.success(`Welcome back, ${data.data.name}!`);
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-surface-900 to-surface-950 border-r border-surface-800 flex-col items-center justify-center p-12">
        <div className="max-w-md">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8">
            <span className="text-white font-display font-bold text-lg">AI</span>
          </div>
          <h2 className="font-display font-bold text-4xl text-white mb-4 leading-tight">
            Your career starts<br />with a great resume.
          </h2>
          <p className="text-slate-400 text-lg">
            Let DeepSeek AI craft your perfect resume while you focus on landing interviews.
          </p>
          <div className="mt-10 space-y-3">
            {['ATS-optimized resumes in seconds', 'Save and manage multiple resumes', 'PDF export with one click'].map((t) => (
              <div key={t} className="flex items-center gap-3 text-slate-400">
                <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl text-white mb-2">Sign in</h1>
            <p className="text-slate-400">Welcome back to ResumeAI</p>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-5">
            <div>
              <label className="label">Email address</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange}
                className="input-field" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="label">Password</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange}
                className="input-field" placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
            <p className="text-center text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-400 hover:text-brand-300 font-medium">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
