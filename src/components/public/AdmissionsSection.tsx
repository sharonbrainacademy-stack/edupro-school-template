import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useNavigation } from '../../context/NavigationContext';
import {
  FileSpreadsheet,
  UserCheck,
  Award,
  BookMarked,
  ArrowRight,
  Sparkles,
  PhoneCall,
  CalendarCheck,
} from 'lucide-react';

export const AdmissionsSection: React.FC = () => {
  const { config } = useSchool();
  const { navigateTo } = useNavigation();

  const steps = [
    {
      num: '01',
      title: 'Online Application',
      desc: 'Complete the digital application form in less than 5 minutes with candidate details and passport photograph.',
      icon: FileSpreadsheet,
    },
    {
      num: '02',
      title: 'Entrance Screening',
      desc: 'Attend the scholastic assessment in English, Mathematics, and General Aptitude at our main campus.',
      icon: UserCheck,
    },
    {
      num: '03',
      title: 'Offer of Admission',
      desc: 'Successful candidates receive an official admission letter, prospectus, and fee breakdown within 48 hours.',
      icon: Award,
    },
    {
      num: '04',
      title: 'Enrolment & Welcome',
      desc: 'Complete registration, collect bespoke school uniforms and textbooks, and join our orientation induction.',
      icon: BookMarked,
    },
  ];

  return (
    <section id="admissions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${config.primaryColor || '#1e3a8a'} 0%, #0f172a 100%)`,
          }}
        >
          {/* Decorative background ambient dots */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Info & Pitch */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">
                <Sparkles size={14} className="text-amber-400" />
                <span>Admissions {config.academicSession}</span>
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Secure Your Child’s Spot for Academic Distinction
              </h2>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                {config.admissionNotice}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('admission')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-xl shadow-amber-500/20 transform transition hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Apply Now Online</span>
                  <ArrowRight size={18} />
                </button>

                <a
                  href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition"
                >
                  <PhoneCall size={18} className="text-amber-300" />
                  <span>Call Admissions Desk</span>
                </a>
              </div>
            </div>

            {/* Right: 4-Step Journey Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl p-5 space-y-3 hover:bg-white/15 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                        <Icon size={20} />
                      </div>
                      <span className="font-serif-heading font-bold text-xl text-amber-300/80">
                        {step.num}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-white">{step.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
