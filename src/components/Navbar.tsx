import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { useNavigation } from '../context/NavigationContext';
import { SchoolLogo } from './SchoolLogo';
import {
  Phone,
  Mail,
  Menu,
  X,
  FileCheck,
  GraduationCap,
  Sparkles,
  Shield,
  ChevronRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { config } = useSchool();
  const { currentPage, navigateTo } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' as const },
    { label: 'About Us', page: 'home' as const, hash: '#about' },
    { label: 'Academics', page: 'home' as const, hash: '#academics' },
    { label: 'Admissions', page: 'admission' as const },
    { label: 'Photo Gallery', page: 'gallery' as const },
    { label: 'News & Events', page: 'news' as const },
    { label: 'Contact', page: 'contact' as const },
  ];

  const handleLinkClick = (page: typeof currentPage, hash?: string) => {
    setMobileMenuOpen(false);
    navigateTo(page);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all no-print">
      {/* Top Announcement & Quick Contact Bar */}
      <div
        className="text-white text-xs py-2 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 font-medium transition-colors"
        style={{
          background: `linear-gradient(90deg, ${config.primaryColor || '#1e3a8a'}, #0f172a)`,
        }}
      >
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          {config.phone && (
            <a
              href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 hover:text-amber-300 transition"
            >
              <Phone size={13} className="text-amber-400" />
              <span>{config.phone}</span>
            </a>
          )}
          {config.email && (
            <a
              href={`mailto:${config.email}`}
              className="hidden md:flex items-center gap-1.5 hover:text-amber-300 transition"
            >
              <Mail size={13} className="text-amber-400" />
              <span>{config.email}</span>
            </a>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {config.admissionIsOpen && (
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
              <Sparkles size={12} className="text-amber-300" />
              <span>{config.academicSession} Admissions Open</span>
            </div>
          )}

          {/* Quick Reseller / Admin Portal Link for Easy Client Demo */}
          <button
            onClick={() => navigateTo('admin')}
            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 text-white px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer"
            title="Access Admin Dashboard (Edit School Name, Logo, Colors, Admissions & Results)"
          >
            <Shield size={12} className="text-amber-300" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* School Logo & Title */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left focus:outline-none cursor-pointer"
        >
          <SchoolLogo size="md" />
        </button>

        {/* Desktop Menu Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.page, link.hash)}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentPage === link.page && !link.hash
                  ? 'text-blue-900 bg-blue-50/80 font-bold'
                  : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons (Result Checker & Apply Now) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => navigateTo('result-checker')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
          >
            <FileCheck size={16} className="text-blue-700" />
            <span>Check Result</span>
          </button>

          <button
            onClick={() => navigateTo('admission')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold rounded-xl text-white shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
            style={{
              backgroundColor: config.primaryColor || '#1e3a8a',
            }}
          >
            <GraduationCap size={16} />
            <span>Apply Now</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => navigateTo('admission')}
            className="sm:hidden px-3 py-1.5 text-xs font-semibold rounded-lg text-white"
            style={{ backgroundColor: config.primaryColor || '#1e3a8a' }}
          >
            Apply
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-3 duration-200">
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.page, link.hash)}
                className="w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 grid gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('result-checker');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-200"
            >
              <FileCheck size={18} className="text-blue-700" />
              <span>Student Result Checker</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('admission');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md"
              style={{ backgroundColor: config.primaryColor || '#1e3a8a' }}
            >
              <GraduationCap size={18} />
              <span>Online Admission Portal</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('admin');
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-amber-700 bg-amber-50 rounded-lg border border-amber-200"
            >
              <Shield size={14} />
              <span>Proprietor Admin Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
