import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { NewsItem } from '../../types/school';
import {
  PlusCircle,
  Calendar,
  Trash2,
  Edit,
  Upload,
  Image as ImageIcon,
  Tag,
  CheckCircle,
  X,
} from 'lucide-react';

export const AdminNews: React.FC = () => {
  const { news, addNewsItem, updateNewsItem, deleteNewsItem, showToast } =
    useSchool();

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'News' as 'News' | 'Event' | 'Notice',
    summary: '',
    content: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'News',
      summary: '',
      content: '',
      image: '',
    });
    setImagePreview('');
    setShowModal(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      date: item.publishDate || item.date || new Date().toISOString().split('T')[0],
      category: item.category || 'News',
      summary: item.excerpt || item.summary || '',
      content: item.content || item.excerpt || item.summary || '',
      image: item.imageUrl || item.image || '',
    });
    setImagePreview(item.imageUrl || item.image || '');
    setShowModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setFormData((prev) => ({ ...prev, image: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim()) {
      alert('Please fill out the headline and summary.');
      return;
    }

    const payload = {
      ...formData,
      image:
        formData.image ||
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
    };

    if (editingItem) {
      updateNewsItem(editingItem.id, payload);
      showToast('Article updated successfully!');
    } else {
      addNewsItem(payload);
      showToast('New article published to homepage!');
    }

    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold font-serif-heading text-slate-900">
            News, Events & Announcements Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Articles and school calendar events published here display on the homepage News section.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
        >
          <PlusCircle size={15} />
          <span>Write Announcement</span>
        </button>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <img
                src={item.imageUrl || item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-blue-900 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">
                {item.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
                  <Calendar size={13} className="text-amber-600" />
                  <span>{item.publishDate || item.date}</span>
                </div>
                <h3 className="font-serif-heading font-bold text-slate-900 text-base leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                  {item.excerpt || item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  title="Edit article"
                >
                  <Edit size={15} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${item.title}"?`)) {
                      deleteNewsItem(item.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                  title="Delete article"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-serif-heading text-slate-900">
                {editingItem ? 'Edit Article' : 'Publish New Announcement'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image box */}
              <div className="flex flex-col items-center p-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-2">
                {imagePreview && (
                  <div className="w-full h-36 rounded-xl overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer">
                  <Upload size={13} className="text-blue-900" />
                  <span>Choose Feature Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Article / Event Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026 Inter-House Athletics Championship"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'News' | 'Event' | 'Notice',
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="News">School News</option>
                    <option value="Event">Upcoming Event</option>
                    <option value="Notice">Notice to Parents</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Event / Publication Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="e.g. March 18, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Short Summary (Displays on card) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief synopsis for the homepage card..."
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Article Body
                </label>
                <textarea
                  rows={4}
                  placeholder="Detailed news release or event program..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-950 shadow-md cursor-pointer"
                >
                  {editingItem ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
