import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { GalleryPhoto } from '../../types/school';
import {
  Image as ImageIcon,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { config, gallery } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = ['All', 'Campus', 'Academics', 'Sports', 'Events', 'Laboratory'];

  const filteredPhotos =
    selectedCategory === 'All'
      ? gallery
      : gallery.filter((p) => p.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ImageIcon size={14} className="text-amber-600" />
            <span>Campus Life & Facilities</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-slate-900">
            A Glimpse into Our Vibrant Community
          </h2>
          <p className="text-slate-600 text-base">
            Explore our state-of-the-art learning facilities, sports arenas, science laboratories, and vibrant student activities.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
              style={selectedCategory === cat ? { backgroundColor: config.primaryColor || '#1e3a8a' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-200 aspect-4/3"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />

              {/* Gradient Overlay & Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {photo.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 size={14} />
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm line-clamp-2 leading-snug">
                    {photo.title}
                  </h4>
                  {photo.description && (
                    <p className="text-slate-300 text-xs line-clamp-1 mt-1">
                      {photo.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <ImageIcon size={36} className="mx-auto text-slate-400 mb-2" />
            <p className="text-slate-600 font-medium">No photos found in this category.</p>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl max-h-[88vh] flex flex-col items-center"
          >
            <img
              src={filteredPhotos[activePhotoIndex].imageUrl}
              alt={filteredPhotos[activePhotoIndex].title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white max-w-2xl px-4">
              <span className="inline-block bg-amber-400 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                {filteredPhotos[activePhotoIndex].category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif-heading">
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              {filteredPhotos[activePhotoIndex].description && (
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  {filteredPhotos[activePhotoIndex].description}
                </p>
              )}
              <p className="text-slate-400 text-xs mt-2">
                Photo {activePhotoIndex + 1} of {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
