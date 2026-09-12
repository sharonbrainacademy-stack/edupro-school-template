import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useNavigation } from '../../context/NavigationContext';
import { setAdminAuthenticated } from '../../utils/storage';
import { SchoolLogo } from '../SchoolLogo';
import { Lock, User, KeyRound, Sparkles, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { config } = useSchool();
  const { navigateTo } = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin123') {
      setAdminAuthenticated(true);
      onSuccess();
    } else {
      setError('Invalid username or password. Default is: admin / admin123');
    }
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-96 opacity-20 pointer-events-none rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${config.primaryColor || '#1e3a8a'} 0%, transparent 70%)`,
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Back to website */}
        <button
          onClick={() => navigateTo('home')}
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Return to Public Website</span>
        </button>

        <div className="text-center space-y-3">
          <div className="inline-block">
            <SchoolLogo size="lg" showText={false} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-white">
            Proprietor Admin Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Secure control panel for {config.name}
          </p>
        </div>

        <div className="mt-8 bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          {error && (
            <div className="p-3.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                />
                <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <KeyRound size={16} className="absolute left-3.5 top-3 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock size={16} />
              <span>Login to Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick 1-Click Login Button for Reseller / Demo */}
          <div className="pt-4 border-t border-slate-700/80">
            <button
              type="button"
              onClick={handleQuickFill}
              className="w-full py-2 px-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-amber-300 border border-slate-600 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Sparkles size={14} className="text-amber-400" />
              <span>Click to Auto-fill (admin / admin123)</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Encrypted local storage administrative session</span>
          </div>
        </div>
      </div>
    </div>
  );
};
