import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useNavigation } from '../../context/NavigationContext';
import {
  Target,
  Compass,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { config } = useSchool();
  const { navigateTo } = useNavigation();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <GraduationCap size={14} className="text-amber-600" />
            <span>Discover Our Legacy</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            {config.aboutTitle || `Excellence in Education at ${config.name}`}
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full" />
        </div>

        {/* Main Content Grid: Image + History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left: Image with Overlapping Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80"
                alt="Students in classroom"
                className="w-full h-[420px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>

            {/* Experience Floating Badge */}
            <div
              className="absolute -bottom-6 -right-4 sm:right-6 text-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border-2 border-amber-300"
              style={{
                backgroundColor: config.primaryColor || '#1e3a8a',
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl font-serif-heading shrink-0 shadow-sm">
                17+
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base leading-tight">Years of Track Record</p>
                <p className="text-xs text-amber-200">Excellence & Discipline</p>
              </div>
            </div>
          </div>

          {/* Right: History & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-heading">
                Our Story & Educational Philosophy
              </h3>
              <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
                {config.aboutHistory}
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <Target size={20} />
                </div>
                <h4 className="font-serif-heading font-bold text-slate-900 text-base">Our Mission</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {config.mission}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Compass size={20} />
                </div>
                <h4 className="font-serif-heading font-bold text-slate-900 text-base">Our Vision</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {config.vision}
                </p>
              </div>
            </div>

            {/* Core Values List */}
            <div className="pt-2">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                <span>Our Core Pillars</span>
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {(config.coreValues || []).map((val, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-100"
                  >
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>{val}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action link */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigateTo('admission')}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-800 hover:text-blue-950 transition cursor-pointer"
              >
                <span>Enroll Your Child Today</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
