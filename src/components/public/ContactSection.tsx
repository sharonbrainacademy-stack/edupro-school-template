import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { config, showToast } = useSchool();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Admissions Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to the admissions office!');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'Admissions Inquiry',
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <MessageSquare size={14} className="text-amber-600" />
            <span>Get in Touch</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-slate-900">
            We Would Love to Hear from You
          </h2>
          <p className="text-slate-600 text-base">
            Reach out to our admissions team for campus tours, prospectus requests, or enrollment inquiries.
          </p>
        </div>

        {/* Contact Grid: Details + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-serif-heading font-bold text-xl text-slate-900">
                School Information
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Physical Address</p>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm mt-0.5">
                      {config.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Telephone Lines</p>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                      {config.phone}
                    </p>
                    {config.altPhone && (
                      <p className="text-slate-500 text-xs">{config.altPhone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email Address</p>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5 break-all">
                      {config.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Administrative Office Hours</p>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                      Monday – Friday: 7:30 AM – 4:30 PM
                    </p>
                    <p className="text-slate-500 text-xs">Saturday: 9:00 AM – 1:00 PM (By Appointment)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle size={36} />
                </div>
                <h3 className="font-serif-heading font-bold text-2xl text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for reaching out. Our admissions counselor will review your note and respond via email or phone call promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif-heading font-bold text-xl text-slate-900 mb-2">
                  Send an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief & Mrs. Adebayo"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08012345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="youremail@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Interest Area
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                    >
                      <option>Admissions Inquiry</option>
                      <option>Tuition & Fees Schedule</option>
                      <option>Book a Campus Tour</option>
                      <option>Scholarship Screening</option>
                      <option>General Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can help you or your child..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  style={{ backgroundColor: config.primaryColor || '#1e3a8a' }}
                >
                  <Send size={16} />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Google Map Embed Section */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <MapPin size={14} className="text-amber-600" />
              Campus Location Map
            </span>
            <span className="text-xs text-slate-500">{config.address}</span>
          </div>
          <iframe
            src={config.googleMapsEmbedUrl}
            title="School Location Map"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
