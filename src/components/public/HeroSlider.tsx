import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useNavigation } from '../../context/NavigationContext';
import {
  GraduationCap,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  BookOpen,
  Calendar,
} from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { config } = useSchool();
  const { navigateTo } = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: `Welcome to ${config.name}`,
      subtitle: config.motto || 'Nurturing Global Innovators with Strong Academic & Moral Foundations',
      description:
        'A distinguished citadel of learning blending high moral discipline, world-class STEAM education, and British-Nigerian curricula to mold future leaders.',
      image:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=80',
      badge: '2026/2027 Admissions Open',
    },
    {
      title: 'Inspiring Academic Brilliance & Character',
      subtitle: 'Modern Science Labs, Coding, Arts & Championship Athletics',
      description:
        'State-of-the-art learning environments designed to unlock each child’s unique potential through hands-on discovery and individualized mentorship.',
      image:
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&auto=format&fit=crop&q=80',
      badge: 'Holistic 21st-Century Education',
    },
    {
      title: 'Consistent Distinction in WAEC, IGCSE & BECE',
      subtitle: 'Over 15 Years of 100% University Transition & Scholastic Honors',
      description:
        'Our alumni gain admission with scholarship opportunities to premier universities in Nigeria, the United Kingdom, the United States, and Canada.',
      image:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600&auto=format&fit=crop&q=80',
      badge: 'Award-Winning Academy',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Slider Slides */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with High-End Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Deep rich dual gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-transparent"
              style={{
                background: `linear-gradient(105deg, #090d16 0%, rgba(15, 23, 42, 0.88) 60%, rgba(30, 58, 138, 0.45) 100%)`,
              }}
            />
          </div>
        ))}

        {/* Slide Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-xs">
              <Sparkles size={15} className="text-amber-400" />
              <span>{slides[currentSlide].badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              {slides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-medium text-amber-300/90 leading-snug">
              {slides[currentSlide].subtitle}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {slides[currentSlide].description}
            </p>

            {/* Dual Call to Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('admission')}
                className="flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-500/20 transform transition hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <GraduationCap size={20} className="text-slate-950" />
                <span>Apply for Admission</span>
              </button>

              <button
                onClick={() => navigateTo('result-checker')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition cursor-pointer"
              >
                <FileCheck size={19} className="text-amber-300" />
                <span>Student Result Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Buttons */}
        <div className="absolute right-6 bottom-24 z-20 hidden md:flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-slate-900/70 border border-slate-700/80 flex items-center justify-center text-white hover:bg-slate-800 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-slate-900/70 border border-slate-700/80 flex items-center justify-center text-white hover:bg-slate-800 transition"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Metrics / Key Stats Strip */}
      <div className="bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-sm py-6 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-2xl sm:text-3xl font-serif-heading">
              <Users size={22} className="text-amber-400" />
              <span>1,400+</span>
            </div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Happy Students</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-2xl sm:text-3xl font-serif-heading">
              <Award size={22} className="text-amber-400" />
              <span>100%</span>
            </div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">WAEC & NECO Pass</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-2xl sm:text-3xl font-serif-heading">
              <BookOpen size={22} className="text-amber-400" />
              <span>45+</span>
            </div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Certified Teachers</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-2xl sm:text-3xl font-serif-heading">
              <Calendar size={22} className="text-amber-400" />
              <span>17+ Years</span>
            </div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Academic Pedigree</p>
          </div>
        </div>
      </div>
    </div>
  );
};
