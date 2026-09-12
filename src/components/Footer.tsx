import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { useNavigation } from '../context/NavigationContext';
import { SchoolLogo } from './SchoolLogo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ExternalLink,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { config } = useSchool();
  const { navigateTo } = useNavigation();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 no-print">
      {/* Top Banner Accent Line */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${config.secondaryColor || '#f59e0b'}, ${config.primaryColor || '#1e3a8a'}, ${config.secondaryColor || '#f59e0b'})`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <SchoolLogo size="md" lightText={true} />
            <p className="text-slate-400 text-sm leading-relaxed pt-1">
              Providing holistic, world-class education rooted in academic distinction, high moral standards, and future-ready technological capabilities.
            </p>
            <div className="pt-2 flex items-center gap-3">
              {config.facebookUrl && (
                <a
                  href={config.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
              )}
              {config.instagramUrl && (
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
              )}
              {config.twitterUrl && (
                <a
                  href={config.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition"
                  aria-label="Twitter / X"
                >
                  <Twitter size={16} />
                </a>
              )}
              {config.youtubeUrl && (
                <a
                  href={config.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition"
                  aria-label="YouTube"
                >
                  <Youtube size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-serif-heading font-semibold text-base tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => {
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  About Our School
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => {
                      document.getElementById('academics')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  Curriculum & Academics
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admission')}
                  className="text-amber-400 hover:text-amber-300 font-medium transition cursor-pointer"
                >
                  Online Admission Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('result-checker')}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  Check Student Results
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('gallery')}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  School Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('news')}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  News & Events
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-white font-serif-heading font-semibold text-base tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              School Campus
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone size={18} className="text-amber-400 shrink-0" />
                <a href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition">
                  {config.phone}
                </a>
              </li>
              {config.altPhone && (
                <li className="flex items-center gap-3 text-slate-400">
                  <Phone size={18} className="text-amber-400 shrink-0 opacity-70" />
                  <a href={`tel:${config.altPhone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition">
                    {config.altPhone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3 text-slate-400">
                <Mail size={18} className="text-amber-400 shrink-0" />
                <a href={`mailto:${config.email}`} className="hover:text-white transition truncate">
                  {config.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Clock size={18} className="text-amber-400 shrink-0" />
                <span>Mon – Fri: 7:30 AM – 4:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Admissions & Accreditation */}
          <div className="space-y-4">
            <h4 className="text-white font-serif-heading font-semibold text-base tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Admission Office
            </h4>
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <ShieldCheck size={16} />
                <span>Ministry of Education Approved</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {config.admissionNotice}
              </p>
              <button
                onClick={() => navigateTo('admission')}
                className="w-full text-center py-2 px-3 rounded-lg text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition shadow-xs cursor-pointer"
              >
                Apply Online Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-200">{config.name}</strong>. All rights reserved.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {/* Editable Reseller / Designer Credit */}
            <span className="flex items-center gap-1 text-slate-400">
              Designed by{' '}
              {config.designerUrl ? (
                <a
                  href={config.designerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline font-medium inline-flex items-center gap-0.5"
                >
                  {config.designerName || 'EduPro Tech Solutions'}
                  <ExternalLink size={10} />
                </a>
              ) : (
                <strong className="text-amber-400 font-medium">
                  {config.designerName || 'EduPro Tech Solutions'}
                </strong>
              )}
            </span>

            <span className="text-slate-700">|</span>

            {/* Discreet Admin Login */}
            <button
              onClick={() => navigateTo('admin')}
              className="hover:text-slate-200 flex items-center gap-1 transition cursor-pointer"
            >
              <Lock size={12} className="text-amber-400/80" />
              <span>Admin Portal Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
