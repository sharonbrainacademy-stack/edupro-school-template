import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useNavigation } from '../../context/NavigationContext';
import {
  Baby,
  BookOpen,
  GraduationCap,
  Microscope,
  Code2,
  Globe2,
  Music,
  Trophy,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export const AcademicsSection: React.FC = () => {
  const { config } = useSchool();
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState<'early' | 'primary' | 'junior' | 'senior'>('senior');

  const programs = {
    early: {
      title: 'Creche, Playgroup & Nursery',
      age: 'Ages 18 Months – 5 Years',
      description:
        'Montessori-inspired foundation that sparks innate curiosity, phonics, fine motor development, social-emotional maturity, and playful discovery.',
      features: [
        'Sensory-Rich Play & Learning',
        'Jolly Phonics & Early Reading Mastery',
        'Numeracy & Practical Life Skills',
        'Secure, Hygenic & Air-Conditioned Creche',
      ],
      curriculum: 'EYFS (Early Years Foundation Stage) + Montessori Method',
    },
    primary: {
      title: 'Primary / Basic Education (Years 1 – 6)',
      age: 'Ages 6 – 11 Years',
      description:
        'A comprehensive foundation focusing on quantitative reasoning, reading fluency, experimental science, computing, French, and moral etiquette.',
      features: [
        'Blended British-Nigerian Cambridge Primary Syllabus',
        'Weekly Hands-On Science Discovery',
        'Kid-Friendly Coding & Computational Thinking',
        'Public Speaking, Diction & Creative Writing',
      ],
      curriculum: 'Cambridge Primary Checkpoint & National Basic Education',
    },
    junior: {
      title: 'Junior Secondary School (JSS 1 – 3)',
      age: 'Ages 11 – 14 Years',
      description:
        'Fostering intellectual independence, scientific inquiry, critical problem-solving, and preparation for national & state BECE examinations.',
      features: [
        'Basic Technology & Pre-Vocational Studies',
        'Introductory Coding & Robotics Labs',
        'French & Foreign Language Immersion',
        'Intensive BECE / Junior WAEC Prep',
      ],
      curriculum: 'National NECO BECE & Cambridge Lower Secondary',
    },
    senior: {
      title: 'Senior Secondary School (SSS 1 – 3)',
      age: 'Ages 14 – 17 Years',
      description:
        'Advanced academic rigor tailored to Science, Arts, and Commercial disciplines. Prepares scholars for top universities globally.',
      features: [
        'Specialized Science, Arts & Business Departments',
        'Advanced Physics, Chemistry & Biology Wet Labs',
        'Intensive WAEC, NECO, JAMB & IGCSE Coaching',
        'Career Counselling & Global University Mentorship',
      ],
      curriculum: 'WASSCE, NECO SSCE, UTME & Cambridge IGCSE',
    },
  };

  const highlights = [
    {
      icon: Code2,
      title: 'Robotics & STEM Lab',
      desc: 'Hands-on coding, 3D logic, electronics, and algorithms from primary to secondary.',
    },
    {
      icon: Microscope,
      title: 'Modern Science Labs',
      desc: 'Fully equipped physics, chemistry, and biology laboratories meeting WAEC/NECO standards.',
    },
    {
      icon: Globe2,
      title: 'French & Global Diction',
      desc: 'Certified elocution tutors honing confidence, phonetics, and multilingual mastery.',
    },
    {
      icon: Trophy,
      title: 'Sports & Co-Curricular',
      desc: 'Football, basketball, swimming, athletics, chess club, and press/debate societies.',
    },
  ];

  return (
    <section id="academics" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen size={14} className="text-amber-600" />
            <span>Academic Programs</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-slate-900">
            Comprehensive Curricula Designed for Excellence
          </h2>
          <p className="text-slate-600 text-base">
            From early exploratory years to university preparatory senior classes, our tailored pathways empower every child to thrive.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'early' as const, label: 'Creche & Nursery', icon: Baby },
            { id: 'primary' as const, label: 'Primary School', icon: BookOpen },
            { id: 'junior' as const, label: 'Junior Secondary', icon: GraduationCap },
            { id: 'senior' as const, label: 'Senior Secondary', icon: Microscope },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
                style={isActive ? { backgroundColor: config.primaryColor || '#1e3a8a' } : {}}
              >
                <Icon size={18} className={isActive ? 'text-amber-400' : 'text-slate-500'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Program Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold">
                {programs[activeTab].age}
              </div>

              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-slate-900">
                {programs[activeTab].title}
              </h3>

              <p className="text-slate-600 text-base leading-relaxed">
                {programs[activeTab].description}
              </p>

              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Program Features & Curriculum
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {programs[activeTab].features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => navigateTo('admission')}
                  className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white shadow-md transition"
                  style={{ backgroundColor: config.primaryColor || '#1e3a8a' }}
                >
                  Apply for this Class
                </button>
                <span className="text-xs text-slate-500 italic">
                  Curriculum: {programs[activeTab].curriculum}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-slate-100">
                <img
                  src={
                    activeTab === 'early'
                      ? 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80'
                      : activeTab === 'primary'
                      ? 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80'
                      : activeTab === 'junior'
                      ? 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80'
                      : 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80'
                  }
                  alt={programs[activeTab].title}
                  className="w-full h-[320px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Academic Pillars / Modern Facilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-3"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: config.primaryColor || '#1e3a8a' }}
                >
                  <Icon size={22} className="text-amber-300" />
                </div>
                <h4 className="font-serif-heading font-bold text-slate-900 text-base">
                  {h.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {h.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
