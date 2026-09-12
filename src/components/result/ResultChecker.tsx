import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useNavigation } from '../../context/NavigationContext';
import { StudentResult } from '../../types/school';
import { ResultSheetModal } from './ResultSheetModal';
import {
  FileCheck,
  KeyRound,
  GraduationCap,
  AlertCircle,
  HelpCircle,
  Sparkles,
  CheckCircle,
  Search,
} from 'lucide-react';

export const ResultChecker: React.FC = () => {
  const { config, results, verifyPin } = useSchool();
  const { navigateTo } = useNavigation();

  const [regNumber, setRegNumber] = useState('');
  const [pin, setPin] = useState('');
  const [selectedResult, setSelectedResult] = useState<StudentResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckResult = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsChecking(true);

    setTimeout(() => {
      const cleanReg = regNumber.trim().toUpperCase();
      const cleanPin = pin.trim().toUpperCase();

      // Find result in database
      const foundResult = results.find(
        (r) => r.regNumber.toUpperCase() === cleanReg
      );

      if (!foundResult) {
        setErrorMsg(`No result found for Registration Number: "${regNumber}". Please check the number or contact the school examination officer.`);
        setIsChecking(false);
        return;
      }

      // Verify PIN
      const pinVerification = verifyPin(cleanPin, cleanReg, foundResult.studentName);
      if (!pinVerification.valid) {
        setErrorMsg(pinVerification.message);
        setIsChecking(false);
        return;
      }

      // Success
      setSelectedResult(foundResult);
      setIsChecking(false);
    }, 500);
  };

  // Quick 1-Click Tester for School Proprietor demo
  const handleQuickFill = (sampleReg: string, samplePin: string) => {
    setRegNumber(sampleReg);
    setPin(samplePin);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-blue-900 flex items-center gap-1 font-semibold cursor-pointer"
          >
            ← Back to School Home
          </button>
          <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-md">
            Term: {config.currentTerm} • {config.academicSession}
          </span>
        </div>

        {/* Portal Header */}
        <div
          className="rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden"
          style={{
            backgroundColor: config.primaryColor || '#1e3a8a',
          }}
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-bold text-xs uppercase px-3 py-1 rounded-full shadow-xs">
              <Sparkles size={13} />
              <span>Student Portal</span>
            </div>
            <h1 className="font-serif-heading text-2xl sm:text-4xl font-bold">
              Online Result Checker
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed">
              Enter your student Registration Number and 10-digit Scratchcard PIN to access your terminal report sheet.
            </p>
          </div>
        </div>

        {/* Checker Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-rose-800 text-xs sm:text-sm">
              <AlertCircle size={20} className="text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block">Unable to verify result:</strong>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleCheckResult} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Student Registration Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. REG/2026/101"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none uppercase font-mono font-medium"
                />
                <GraduationCap
                  size={18}
                  className="absolute left-4 top-3.5 text-slate-400"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Format: REG/YYYY/XXX (as issued on student ID card)
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Result Checker PIN / Scratchcard Code *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. PIN-8492-7104"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none uppercase font-mono font-bold tracking-wider"
                />
                <KeyRound
                  size={18}
                  className="absolute left-4 top-3.5 text-slate-400"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Obtain your official scratchcard or PIN from the school accountant or bursary office.
              </p>
            </div>

            <button
              type="submit"
              disabled={isChecking}
              className="w-full py-4 rounded-xl font-bold text-sm sm:text-base text-white shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: config.primaryColor || '#1e3a8a' }}
            >
              {isChecking ? (
                <span>Retrieving Record...</span>
              ) : (
                <>
                  <FileCheck size={18} />
                  <span>Check & Print My Result</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Test Box (Helps the School Owner / Buyer Test Immediately!) */}
          <div className="mt-8 pt-6 border-t border-slate-200 bg-amber-50/70 border-amber-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wider">
              <Sparkles size={16} className="text-amber-600" />
              <span>Proprietor / Reseller 1-Click Demo Sandbox</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Test the student result portal immediately with pre-loaded sample students:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleQuickFill('REG/2026/101', 'PIN-8492-7104')}
                className="bg-white hover:bg-amber-100 border border-amber-300 rounded-xl p-2.5 text-left transition text-xs cursor-pointer"
              >
                <span className="font-bold text-slate-900 block truncate">
                  Somtochukwu Eze (JSS 2)
                </span>
                <span className="text-[11px] font-mono text-blue-900">
                  REG/2026/101 • 1st Position
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('REG/2026/102', 'PIN-3190-8452')}
                className="bg-white hover:bg-amber-100 border border-amber-300 rounded-xl p-2.5 text-left transition text-xs cursor-pointer"
              >
                <span className="font-bold text-slate-900 block truncate">
                  Tolu Fashola (SSS 2)
                </span>
                <span className="text-[11px] font-mono text-blue-900">
                  REG/2026/102 • Science
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('REG/2026/103', 'PIN-9921-4501')}
                className="bg-white hover:bg-amber-100 border border-amber-300 rounded-xl p-2.5 text-left transition text-xs cursor-pointer"
              >
                <span className="font-bold text-slate-900 block truncate">
                  Zainab Danjuma (Primary 5)
                </span>
                <span className="text-[11px] font-mono text-blue-900">
                  REG/2026/103 • 2nd Position
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Portal Guidance */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 text-xs text-slate-600 flex items-start gap-3">
          <HelpCircle size={18} className="text-blue-800 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800">Trouble Checking Your Result?</h4>
            <p className="leading-relaxed">
              Ensure you have typed the exact registration number as shown on your admission slip. If your PIN says "Exceeded usage limit", please contact the bursar's office to generate a new PIN.
            </p>
          </div>
        </div>
      </div>

      {/* Result Sheet Modal with Print Button */}
      {selectedResult && (
        <ResultSheetModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
};
