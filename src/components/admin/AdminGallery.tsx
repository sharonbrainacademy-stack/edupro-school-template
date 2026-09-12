import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { GalleryPhoto } from '../../types/school';
import {
  Upload,
  PlusCircle,
  Trash2,
  Image as ImageIcon,
  Tag,
  Sparkles,
  X,
  CheckCircle,
} from 'lucide-react';

export const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem, showToast } = useSchool();
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Academics',
    caption: '',
    url: '',
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setFormData((prev) => ({ ...prev, url: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.url) {
      alert('Please enter a title and select/provide an image.');
      return;
    }

    addGalleryItem({
      title: formData.title,
      category: formData.category,
      caption: formData.caption,
      url: formData.url,
    });

    showToast('New photo added to school gallery!');
    setShowAddModal(false);
    setFormData({
      title: '',
      category: 'Academics',
      caption: '',
      url: '',
    });
    setImagePreview('');
  };

  const categories = ['All', 'Academics', 'Sports', 'Laboratory', 'Cultural', 'Events'];

  const filteredGallery =
    activeCategory === 'All'
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold font-serif-heading text-slate-900">
            Campus Photo Gallery Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Total {gallery.length} photos published on the public website homepage.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
        >
          <PlusCircle size={15} />
          <span>Upload New Photo</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeCategory === cat
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredGallery.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs group flex flex-col justify-between"
          >
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <img
                src={item.imageUrl || item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-slate-900 text-xs sm:text-sm line-clamp-1">
                  {item.title}
                </h4>
                {(item.description || item.caption) && (
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                    {item.description || item.caption}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  {item.dateAdded || item.createdAt || 'Recent'}
                </span>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete photo "${item.title}"?`)) {
                      deleteGalleryItem(item.id);
                    }
                  }}
                  className="text-rose-500 hover:text-rose-700 p-1 rounded-md hover:bg-rose-50 transition cursor-pointer"
                  title="Delete photo"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-serif-heading text-slate-900">
                Add Campus Photo to Gallery
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Preview / Upload Box */}
              <div className="flex flex-col items-center p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-3">
                {imagePreview ? (
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-black/5">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-slate-400 space-y-1">
                    <ImageIcon size={36} className="mx-auto text-slate-300" />
                    <span className="text-xs font-semibold block text-slate-600">
                      Select photo from your device
                    </span>
                    <span className="text-[10px] text-slate-400">
                      JPEG, PNG or WebP
                    </span>
                  </div>
                )}

                <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer">
                  <Upload size={14} className="text-blue-900" />
                  <span>Choose Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Or Image Web URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.url.startsWith('data:') ? '' : formData.url}
                  onChange={(e) => {
                    setFormData({ ...formData, url: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Chemistry Laboratory"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
                  >
                    <option>Academics</option>
                    <option>Sports</option>
                    <option>Laboratory</option>
                    <option>Cultural</option>
                    <option>Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Short Caption
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Practical session"
                    value={formData.caption}
                    onChange={(e) =>
                      setFormData({ ...formData, caption: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-950 shadow-md cursor-pointer"
                >
                  Publish to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
