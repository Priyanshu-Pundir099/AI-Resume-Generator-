import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { data } = await authApi.register(formData);
      if (data.success) {
        login(data.data);
        toast.success(`Account created! Welcome, ${data.data.name}!`);
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">AI</span>
            </div>
            <span className="font-display font-bold text-xl text-white">ResumeAI</span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-white mb-2">Create account</h1>
          <p className="text-slate-400">Start generating AI-powered resumes today</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          <div>
            <label className="label">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange}
              className="input-field" placeholder="John Doe" required minLength={2} />
          </div>
          <div>
            <label className="label">Email address</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange}
              className="input-field" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="label">Password</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange}
              className="input-field" placeholder="Min. 6 characters" required minLength={6} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating account...
              </span>
            ) : 'Create Account'}
          </button>
          <p className="text-center text-slate-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
