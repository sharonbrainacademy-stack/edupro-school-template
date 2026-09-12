import React, { useState, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolConfig } from '../../types/school';
import { exportAllDataJSON, importAllDataJSON } from '../../utils/storage';
import {
  Save,
  Palette,
  School,
  Phone,
  Mail,
  MapPin,
  Upload,
  RotateCcw,
  Download,
  FileCode,
  Sparkles,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { config, updateConfig, resetData, showToast } = useSchool();
  const [formData, setFormData] = useState<SchoolConfig>(config);
  const [logoPreview, setLogoPreview] = useState<string>(config.logoUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preset Color Palettes for Schools
  const themePresets = [
    {
      name: 'Royal Blue & Gold (Classic)',
      primary: '#1e3a8a',
      secondary: '#f59e0b',
      accent: '#0284c7',
    },
    {
      name: 'Forest Emerald & Gold (Prestige)',
      primary: '#064e3b',
      secondary: '#eab308',
      accent: '#10b981',
    },
    {
      name: 'Crimson Burgundy & Amber',
      primary: '#881337',
      secondary: '#f59e0b',
      accent: '#e11d48',
    },
    {
      name: 'Imperial Purple & Champagne',
      primary: '#581c87',
      secondary: '#fbbf24',
      accent: '#8b5cf6',
    },
    {
      name: 'Deep Navy & Sky Blue',
      primary: '#0f172a',
      secondary: '#38bdf8',
      accent: '#2563eb',
    },
  ];

  const handleApplyTheme = (preset: typeof themePresets[0]) => {
    const updated = {
      ...formData,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    };
    setFormData(updated);
    updateConfig(updated);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLogoPreview(base64);
        setFormData((prev) => ({ ...prev, logoUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
  };

  const handleBackupExport = () => {
    const jsonStr = exportAllDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_backup.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Database backup downloaded successfully!');
  };

  const handleRestoreImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const success = importAllDataJSON(content);
        if (success) {
          showToast('Database restored! Refreshing state...');
          setTimeout(() => window.location.reload(), 1000);
        } else {
          alert('Failed to import database. Please verify JSON format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif-heading text-slate-900">
            School Brand, Profile & Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Customize school identity, color scheme, logos, contact info, and website texts. Changes take effect across the entire public website instantly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBackupExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer"
            title="Export full database as JSON file"
          >
            <Download size={14} />
            <span>Export Backup</span>
          </button>

          <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer">
            <FileCode size={14} />
            <span>Import Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleRestoreImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Visual Theme & Color Palette */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-slate-900">
            <Palette size={20} className="text-amber-500" />
            <h3 className="font-serif-heading font-bold text-lg">
              School Color Theme & Visual Presets
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Choose an instant color preset or select custom hex colors to match the school's official blazer or crest uniforms.
          </p>

          {/* Presets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {themePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyTheme(preset)}
                className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                  formData.primaryColor === preset.primary
                    ? 'border-blue-900 bg-blue-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {preset.name}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: preset.secondary }}
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: preset.accent }}
                    />
                  </div>
                </div>
                {formData.primaryColor === preset.primary && (
                  <CheckCircle size={18} className="text-blue-900" />
                )}
              </button>
            ))}
          </div>

          {/* Custom Color Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Brand Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.primaryColor || '#1e3a8a'}
                  onChange={(e) =>
                    setFormData({ ...formData, primaryColor: e.target.value })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) =>
                    setFormData({ ...formData, primaryColor: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Secondary Accent (Gold / Highlight)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.secondaryColor || '#f59e0b'}
                  onChange={(e) =>
                    setFormData({ ...formData, secondaryColor: e.target.value })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5"
                />
                <input
                  type="text"
                  value={formData.secondaryColor}
                  onChange={(e) =>
                    setFormData({ ...formData, secondaryColor: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Active Session & Current Term
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.academicSession}
                  onChange={(e) =>
                    setFormData({ ...formData, academicSession: e.target.value })
                  }
                  placeholder="2025/2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
                <input
                  type="text"
                  value={formData.currentTerm}
                  onChange={(e) =>
                    setFormData({ ...formData, currentTerm: e.target.value })
                  }
                  placeholder="2nd Term"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: School Identity & Logo Upload */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-slate-900">
            <School size={20} className="text-blue-800" />
            <h3 className="font-serif-heading font-bold text-lg">
              School Name, Motto & Official Crest
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Logo Preview & Uploader */}
            <div className="sm:col-span-4 flex flex-col items-center p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
              <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden p-2">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="School Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No Custom Logo (Using Crest)</span>
                )}
              </div>

              <div className="space-y-1">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer">
                  <Upload size={13} />
                  <span>Upload Logo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                {logoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreview('');
                      setFormData({ ...formData, logoUrl: '' });
                    }}
                    className="block text-[11px] text-rose-600 hover:underline mx-auto mt-1 cursor-pointer"
                  >
                    Remove Custom Logo
                  </button>
                )}
              </div>
            </div>

            {/* Name & Motto inputs */}
            <div className="sm:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  School Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apex Royal Academy"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-blue-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  School Motto / Tagline
                </label>
                <input
                  type="text"
                  value={formData.motto}
                  onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                  placeholder="e.g. Knowledge, Integrity & Excellence"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm italic focus:ring-2 focus:ring-blue-800 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Contact Channels & Location */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-slate-900">
            <Phone size={20} className="text-emerald-600" />
            <h3 className="font-serif-heading font-bold text-lg">
              Contact Channels, WhatsApp & Address
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Phone Number *
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                WhatsApp Chat Number (with country code) *
              </label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="2348031234567"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Official Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Alternative Phone Number (Optional)
              </label>
              <input
                type="text"
                value={formData.altPhone || ''}
                onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Physical Address *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Public Text Content (About Us, History, Mission, Vision) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-slate-900">
            <Sparkles size={20} className="text-amber-500" />
            <h3 className="font-serif-heading font-bold text-lg">
              Website Copy (About Us, Mission, Vision & Admission Notice)
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                About Us Headline
              </label>
              <input
                type="text"
                value={formData.aboutTitle}
                onChange={(e) =>
                  setFormData({ ...formData, aboutTitle: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                School History & Background Story
              </label>
              <textarea
                rows={4}
                value={formData.aboutHistory}
                onChange={(e) =>
                  setFormData({ ...formData, aboutHistory: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mission Statement
                </label>
                <textarea
                  rows={3}
                  value={formData.mission}
                  onChange={(e) =>
                    setFormData({ ...formData, mission: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Vision Statement
                </label>
                <textarea
                  rows={3}
                  value={formData.vision}
                  onChange={(e) =>
                    setFormData({ ...formData, vision: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admission Notice & Announcement Text
              </label>
              <textarea
                rows={2}
                value={formData.admissionNotice}
                onChange={(e) =>
                  setFormData({ ...formData, admissionNotice: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Reseller / Designer White-Label Branding */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-slate-900">
            <ExternalLink size={20} className="text-purple-600" />
            <h3 className="font-serif-heading font-bold text-lg">
              Reseller & Footer Credit ("Designed by [Your Company]")
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            When reselling this template for ₦30,000 promo, set your agency name and WhatsApp link here so other prospective clients can contact you!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Designer / Agency Name
              </label>
              <input
                type="text"
                value={formData.designerName}
                onChange={(e) =>
                  setFormData({ ...formData, designerName: e.target.value })
                }
                placeholder="e.g. EduPro Digital Solutions"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Agency Website or WhatsApp Link
              </label>
              <input
                type="text"
                value={formData.designerUrl}
                onChange={(e) =>
                  setFormData({ ...formData, designerUrl: e.target.value })
                }
                placeholder="https://wa.me/234..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Save & Reset Actions Bar */}
        <div className="sticky bottom-6 z-30 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  'Restore all school configuration, sample results, and admissions to original default demo?'
                )
              ) {
                resetData();
                setFormData(config);
              }
            }}
            className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset Everything to Default Demo</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save size={16} />
              <span>Save & Update Website Instantly</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
