import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { NewsItem } from '../../types/school';
import {
  Calendar,
  User,
  ArrowRight,
  Bell,
  X,
  Share2,
  Clock,
} from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { news, config } = useSchool();
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  // Take latest 3 items
  const latestNews = [...news].slice(0, 3);

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Bell size={14} className="text-amber-600" />
              <span>Announcements & Events</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-slate-900">
              Latest Happenings at {config.name}
            </h2>
            <p className="text-slate-600 text-base">
              Stay up to date with scholastic achievements, upcoming events, term calendars, and vital notices.
            </p>
          </div>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image with category tag */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${
                    item.category === 'Event'
                      ? 'bg-amber-400 text-slate-950'
                      : item.category === 'Announcement'
                      ? 'bg-rose-500 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {item.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-amber-600" />
                      {new Date(item.publishDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    {item.eventDate && (
                      <span className="flex items-center gap-1 text-amber-700 font-semibold">
                        <Clock size={13} />
                        Event: {item.eventDate}
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => setActiveArticle(item)}
                    className="font-serif-heading font-bold text-lg text-slate-900 group-hover:text-blue-900 transition cursor-pointer line-clamp-2 leading-snug"
                  >
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 italic">
                    By {item.author || 'School Admin'}
                  </span>
                  <button
                    onClick={() => setActiveArticle(item)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-800 hover:text-blue-950 transition cursor-pointer"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div
          onClick={() => setActiveArticle(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
          >
            <div className="relative h-64 sm:h-72 w-full">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {activeArticle.category}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-amber-600" />
                  {activeArticle.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-slate-400" />
                  {activeArticle.author}
                </span>
                {activeArticle.eventDate && (
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-semibold text-xs">
                    Event Date: {activeArticle.eventDate}
                  </span>
                )}
              </div>

              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                {activeArticle.title}
              </h3>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-100 pt-4">
                {activeArticle.content}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
