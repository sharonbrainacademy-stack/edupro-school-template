import React from 'react';
import { AdmissionApplication } from '../../types/school';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../SchoolLogo';
import { Printer, X, Download, CheckCircle, QrCode } from 'lucide-react';

interface AdmissionSlipModalProps {
  application: AdmissionApplication;
  onClose: () => void;
}

export const AdmissionSlipModal: React.FC<AdmissionSlipModalProps> = ({
  application,
  onClose,
}) => {
  const { config } = useSchool();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Top action bar (hidden during print) */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-200">
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-emerald-400" />
            <span className="font-semibold text-sm">Official Admission Examination Slip</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition shadow-xs cursor-pointer"
            >
              <Printer size={15} />
              <span>Print Slip to PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Official Document */}
        <div className="print-container p-6 sm:p-10 bg-white text-slate-900 overflow-y-auto max-h-[85vh]">
          {/* Slip Header */}
          <div className="border-b-2 border-slate-900 pb-5 mb-6 text-center relative">
            <div className="flex items-center justify-center gap-4 mb-2">
              <SchoolLogo size="lg" showText={false} />
              <div>
                <h1 className="font-serif-heading font-extrabold text-2xl sm:text-3xl text-slate-950 tracking-tight uppercase">
                  {config.name}
                </h1>
                <p className="text-xs italic text-slate-700 font-serif-heading">
                  {config.motto}
                </p>
                <p className="text-xs text-slate-600 mt-1 max-w-xl mx-auto">
                  {config.address} • Tel: {config.phone} • Email: {config.email}
                </p>
              </div>
            </div>

            <div className="mt-3 inline-block bg-slate-950 text-white font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-sm">
              ENTRANCE EXAMINATION & SCREENING SLIP • {config.academicSession}
            </div>
          </div>

          {/* Photo & Application ID Bar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 bg-slate-50 border border-slate-200 p-4 rounded-xl mb-6">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-xs font-semibold text-slate-500 uppercase">Application Number</p>
              <p className="text-xl sm:text-2xl font-mono font-bold text-blue-900">
                {application.applicationNumber}
              </p>
              <p className="text-xs text-slate-600">
                Submitted On:{' '}
                {new Date(application.submittedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>

            {/* Passport Photo */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-32 border-2 border-slate-400 rounded-lg overflow-hidden bg-slate-200 shadow-xs flex items-center justify-center">
                {application.passportPhoto ? (
                  <img
                    src={application.passportPhoto}
                    alt={application.studentFullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[11px] text-slate-500 text-center p-2">
                    Candidate Passport Photo
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 uppercase font-bold">
                Candidate Photo
              </span>
            </div>
          </div>

          {/* Candidate Bio Data Table */}
          <div className="space-y-5 mb-6 text-xs sm:text-sm">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                1. Candidate Particulars
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 border border-slate-200 rounded-lg">
                <div>
                  <span className="text-slate-500 block text-[11px]">Full Name:</span>
                  <strong className="text-slate-900 text-sm font-semibold">
                    {application.studentFullName}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Class Applying For:</span>
                  <strong className="text-blue-900 text-sm font-bold">
                    {application.classApplyingFor}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Date of Birth:</span>
                  <strong className="text-slate-900">{application.dateOfBirth}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Gender:</span>
                  <strong className="text-slate-900">{application.gender}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">State of Origin:</span>
                  <strong className="text-slate-900">{application.stateOfOrigin}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Previous School:</span>
                  <strong className="text-slate-900">{application.previousSchool || 'N/A'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Last Class Passed:</span>
                  <strong className="text-slate-900">{application.lastClassPassed || 'N/A'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Status:</span>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-sm">
                    {application.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Parent Particulars */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                2. Parent / Guardian Particulars
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3 border border-slate-200 rounded-lg">
                <div>
                  <span className="text-slate-500 block text-[11px]">Parent / Guardian:</span>
                  <strong className="text-slate-900">{application.parentFullName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Telephone Number:</span>
                  <strong className="text-slate-900 font-mono">{application.parentPhone}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Email:</span>
                  <strong className="text-slate-900">{application.parentEmail || 'N/A'}</strong>
                </div>
                <div className="sm:col-span-3">
                  <span className="text-slate-500 block text-[11px]">Residential Address:</span>
                  <strong className="text-slate-900">{application.residentialAddress}</strong>
                </div>
              </div>
            </div>

            {/* Screening Schedule & Instructions */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-xs text-amber-950 uppercase tracking-wide">
                3. Examination Schedule & Instructions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-amber-900">
                <div>
                  <span className="text-amber-800 font-semibold block">Screening Date:</span>
                  <span className="font-bold">
                    {application.examDate || 'Check with Admissions Desk'}
                  </span>
                </div>
                <div>
                  <span className="text-amber-800 font-semibold block">Arrival Time:</span>
                  <span className="font-bold">8:30 AM Prompt</span>
                </div>
                <div>
                  <span className="text-amber-800 font-semibold block">Venue:</span>
                  <span className="font-bold">School Multipurpose Hall</span>
                </div>
              </div>
              <p className="text-[11px] text-amber-900/80 pt-1">
                <strong>Mandatory Requirements:</strong> Candidate must arrive with this printed slip, two (2) passport photographs, photocopy of birth certificate, previous term result sheet, and standard writing stationery (pencils, biro, eraser).
              </p>
            </div>
          </div>

          {/* Signature and Verification Footer */}
          <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-6">
              <div className="border-b border-slate-400 w-3/4 mx-auto" />
              <p className="font-semibold text-slate-700">Parent / Guardian Signature & Date</p>
            </div>
            <div className="space-y-6">
              <div className="border-b border-slate-400 w-3/4 mx-auto" />
              <p className="font-semibold text-slate-700">Registrar & Admissions Officer Stamp</p>
            </div>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-6 italic">
            This slip is an official document generated by the {config.name} Online Portal. Alteration renders it void.
          </p>
        </div>
      </div>
    </div>
  );
};
