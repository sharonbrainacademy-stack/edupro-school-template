import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useNavigation } from '../../context/NavigationContext';
import { AdmissionApplication } from '../../types/school';
import { AdmissionSlipModal } from './AdmissionSlipModal';
import {
  GraduationCap,
  Upload,
  User,
  Phone,
  Mail,
  Calendar,
  Home,
  CheckCircle,
  FileCheck,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const AdmissionPortal: React.FC = () => {
  const { config, submitApplication } = useSchool();
  const { navigateTo } = useNavigation();

  const [formData, setFormData] = useState({
    studentFullName: '',
    dateOfBirth: '',
    gender: 'Male' as 'Male' | 'Female',
    classApplyingFor: 'JSS 1',
    religion: 'Christianity',
    stateOfOrigin: 'Lagos State',
    lga: '',
    parentFullName: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    residentialAddress: '',
    previousSchool: '',
    lastClassPassed: '',
    passportPhoto: '',
  });

  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [createdApplication, setCreatedApplication] = useState<AdmissionApplication | null>(null);
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle local passport photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoPreview(base64);
        setFormData((prev) => ({ ...prev, passportPhoto: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const app = submitApplication({
        ...formData,
        passportPhoto:
          photoPreview ||
          'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80',
      });
      setCreatedApplication(app);
      setIsSubmitting(false);
    }, 600);
  };

  const handleApplyAnother = () => {
    setCreatedApplication(null);
    setPhotoPreview('');
    setFormData({
      studentFullName: '',
      dateOfBirth: '',
      gender: 'Male',
      classApplyingFor: 'JSS 1',
      religion: 'Christianity',
      stateOfOrigin: 'Lagos State',
      lga: '',
      parentFullName: '',
      parentPhone: '',
      parentEmail: '',
      parentOccupation: '',
      residentialAddress: '',
      previousSchool: '',
      lastClassPassed: '',
      passportPhoto: '',
    });
  };

  const classOptions = [
    'Creche / Daycare',
    'Playgroup (Age 2)',
    'Nursery 1',
    'Nursery 2',
    'Primary 1',
    'Primary 2',
    'Primary 3',
    'Primary 4',
    'Primary 5',
    'Primary 6',
    'JSS 1 (Basic 7)',
    'JSS 2 (Basic 8)',
    'JSS 3 (Basic 9)',
    'SSS 1 (Science)',
    'SSS 1 (Arts)',
    'SSS 1 (Commercial)',
    'SSS 2 (Science)',
    'SSS 2 (Arts)',
    'SSS 2 (Commercial)',
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb / Top Link */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-blue-900 flex items-center gap-1 font-semibold cursor-pointer"
          >
            ← Back to School Home
          </button>
          <span className="bg-blue-100 text-blue-900 font-bold px-2.5 py-1 rounded-md">
            Academic Session: {config.academicSession}
          </span>
        </div>

        {/* Portal Header */}
        <div
          className="rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden"
          style={{
            backgroundColor: config.primaryColor || '#1e3a8a',
          }}
        >
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-bold text-xs uppercase px-3 py-1 rounded-full shadow-xs">
              <Sparkles size={13} />
              <span>Official Admissions Gateway</span>
            </div>
            <h1 className="font-serif-heading text-2xl sm:text-4xl font-bold">
              {config.name} Enrolment Form
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Kindly provide accurate candidate information. An official Application ID and printable Entrance Examination Slip will be generated instantly upon submission.
            </p>
          </div>
        </div>

        {/* Success View */}
        {createdApplication ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6 animate-in fade-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle size={48} />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-emerald-600 tracking-wider">
                Application Submitted Successfully
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-slate-900">
                Welcome to {config.name}!
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Candidate <strong className="text-slate-900">{createdApplication.studentFullName}</strong> has been registered for admission into{' '}
                <strong className="text-blue-900">{createdApplication.classApplyingFor}</strong>.
              </p>
            </div>

            {/* Application ID Card */}
            <div className="max-w-md mx-auto bg-slate-50 border-2 border-dashed border-blue-900/30 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                Generated Application ID
              </span>
              <p className="text-2xl sm:text-3xl font-mono font-black text-blue-950 tracking-wider">
                {createdApplication.applicationNumber}
              </p>
              <p className="text-xs text-slate-500">
                Please retain this application number for screening verification.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setShowSlipModal(true)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white shadow-lg transition transform hover:scale-102 active:scale-98 cursor-pointer"
                style={{ backgroundColor: config.primaryColor || '#1e3a8a' }}
              >
                <Printer size={18} />
                <span>View & Print Admission Slip (PDF)</span>
              </button>

              <button
                onClick={handleApplyAnother}
                className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>

            <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-center gap-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>A confirmation record has been safely archived in the school registry.</span>
            </div>
          </div>
        ) : (
          /* Application Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-10"
          >
            {/* Section 1: Candidate Bio-data */}
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif-heading font-bold text-lg text-slate-900">
                    1. Candidate Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Personal particulars of the applicant child.
                  </p>
                </div>
                <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-2.5 py-1 rounded-md">
                  Step 1 of 3
                </span>
              </div>

              {/* Passport Photo Upload Box */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-28 h-32 rounded-xl border-2 border-dashed border-slate-300 bg-white flex items-center justify-center overflow-hidden shrink-0 relative shadow-xs">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Passport preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-2 text-slate-400">
                      <User size={32} className="mx-auto mb-1 opacity-50" />
                      <span className="text-[10px] block leading-tight font-medium">
                        Passport Photo
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-slate-800">
                    Upload Recent Passport Photograph *
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Upload a clear, white-background passport photograph (JPEG, PNG). Max 2MB.
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 shadow-xs cursor-pointer transition">
                    <Upload size={14} className="text-blue-800" />
                    <span>Choose Passport Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  {photoPreview && (
                    <span className="block text-emerald-600 text-xs font-medium">
                      ✓ Image loaded successfully
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Somtochukwu Emmanuel Eze"
                    value={formData.studentFullName}
                    onChange={(e) =>
                      setFormData({ ...formData, studentFullName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Class Applying For *
                  </label>
                  <select
                    value={formData.classApplyingFor}
                    onChange={(e) =>
                      setFormData({ ...formData, classApplyingFor: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white font-medium"
                  >
                    {classOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Gender *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Male', 'Female'].map((g) => (
                      <label
                        key={g}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition ${
                          formData.gender === g
                            ? 'border-blue-900 bg-blue-50/70 text-blue-950'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={() =>
                            setFormData({ ...formData, gender: g as 'Male' | 'Female' })
                          }
                          className="hidden"
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    State of Origin
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lagos / Anambra / Kaduna"
                    value={formData.stateOfOrigin}
                    onChange={(e) =>
                      setFormData({ ...formData, stateOfOrigin: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Religion
                  </label>
                  <select
                    value={formData.religion}
                    onChange={(e) =>
                      setFormData({ ...formData, religion: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
                  >
                    <option>Christianity</option>
                    <option>Islam</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Parent / Guardian Info */}
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif-heading font-bold text-lg text-slate-900">
                    2. Parent / Guardian Details
                  </h3>
                  <p className="text-xs text-slate-500">
                    Primary sponsor contact details for examination notification.
                  </p>
                </div>
                <span className="text-xs font-semibold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md">
                  Step 2 of 3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Parent / Guardian Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. & Mrs. Okonkwo"
                    value={formData.parentFullName}
                    onChange={(e) =>
                      setFormData({ ...formData, parentFullName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Parent Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08031234567"
                    value={formData.parentPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, parentPhone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="parent@example.com"
                    value={formData.parentEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, parentEmail: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Parent Occupation / Profession
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Financial Analyst / Business Executive"
                    value={formData.parentOccupation}
                    onChange={(e) =>
                      setFormData({ ...formData, parentOccupation: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Residential Home Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Street name, House number, Estate / Area, City"
                    value={formData.residentialAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, residentialAddress: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Academic Background */}
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif-heading font-bold text-lg text-slate-900">
                    3. Academic Background
                  </h3>
                  <p className="text-xs text-slate-500">
                    Previous schooling and scholastic credentials.
                  </p>
                </div>
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md">
                  Step 3 of 3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Previous School Attended
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. St. Saviours Primary School"
                    value={formData.previousSchool}
                    onChange={(e) =>
                      setFormData({ ...formData, previousSchool: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Last Class Passed / Completed
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Primary 5 / JSS 2"
                    value={formData.lastClassPassed}
                    onChange={(e) =>
                      setFormData({ ...formData, lastClassPassed: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submission Agreement & Action */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex items-start gap-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl">
                <input
                  type="checkbox"
                  required
                  id="declaration"
                  className="mt-0.5 rounded text-blue-900"
                />
                <label htmlFor="declaration" className="cursor-pointer">
                  I hereby certify that the information supplied above is true and accurate. I understand that any false declaration may invalidate the candidate’s admission into {config.name}.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-bold text-base text-white shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: config.primaryColor || '#1e3a8a' }}
              >
                {isSubmitting ? (
                  <span>Processing Application...</span>
                ) : (
                  <>
                    <GraduationCap size={20} />
                    <span>Submit Application & Generate Official Slip</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Printable Slip Modal */}
      {showSlipModal && createdApplication && (
        <AdmissionSlipModal
          application={createdApplication}
          onClose={() => setShowSlipModal(false)}
        />
      )}
    </div>
  );
};
