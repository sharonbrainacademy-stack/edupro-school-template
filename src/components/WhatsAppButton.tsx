import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { config } = useSchool();
  const [isOpen, setIsOpen] = useState(false);

  if (!config.whatsapp) return null;

  const cleanNumber = config.whatsapp.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    `Hello ${config.name}, I would like to inquire about admissions and school fees for the ${config.academicSession} academic session.`
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 no-print flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div
            className="p-4 text-white flex items-center justify-between"
            style={{ backgroundColor: config.primaryColor || '#1e3a8a' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">{config.name}</p>
                <p className="text-xs text-amber-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                  Admissions Office Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-4 bg-slate-50 text-sm text-slate-700">
            <p className="bg-white p-3 rounded-xl rounded-tl-none shadow-xs border border-slate-200 text-xs leading-relaxed">
              👋 Welcome to <strong className="text-slate-900">{config.name}</strong>! How may we assist you with admissions, prospectus, or school tours today?
            </p>
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-2.5 px-4 rounded-xl shadow-xs transition"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        style={{
          boxShadow: '0 8px 25px -4px rgba(16, 185, 129, 0.45)',
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="animate-bounce-subtle" />
        <span className="hidden sm:inline font-semibold text-sm tracking-wide">
          Chat with Us
        </span>
      </button>
    </div>
  );
};
