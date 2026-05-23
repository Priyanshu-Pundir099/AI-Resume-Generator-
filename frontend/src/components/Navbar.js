import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">AI</span>
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              ResumeAI
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'text-brand-400 bg-brand-500/10'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/builder"
                  className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    location.pathname === '/builder'
                      ? 'text-brand-400 bg-brand-500/10'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Builder
                </Link>
                <div className="flex items-center gap-2 pl-3 border-l border-surface-700">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-slate-300 hidden sm:block">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-slate-400 hover:text-red-400 transition-colors ml-1"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
