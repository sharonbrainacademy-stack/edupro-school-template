import React from 'react';
import { StudentResult } from '../../types/school';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../SchoolLogo';
import { Printer, X, Award, CheckCircle, ShieldCheck } from 'lucide-react';

interface ResultSheetModalProps {
  result: StudentResult;
  onClose: () => void;
}

export const ResultSheetModal: React.FC<ResultSheetModalProps> = ({
  result,
  onClose,
}) => {
  const { config } = useSchool();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-200">
        {/* Modal Toolbar (hidden during print) */}
        <div className="no-print bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-amber-400" />
            <span className="font-semibold text-sm">
              Official Terminal Continuous Assessment & Examination Report
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition shadow-xs cursor-pointer"
            >
              <Printer size={15} />
              <span>Print Result Sheet (PDF)</span>
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

        {/* Printable Official School Result Sheet */}
        <div className="print-container p-6 sm:p-10 bg-white text-slate-900 overflow-y-auto max-h-[85vh] text-xs sm:text-sm">
          {/* Header Banner */}
          <div className="border-b-2 border-slate-900 pb-4 mb-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-1">
              <SchoolLogo size="lg" showText={false} />
              <div>
                <h1 className="font-serif-heading font-black text-xl sm:text-3xl text-slate-950 tracking-tight uppercase">
                  {config.name}
                </h1>
                <p className="text-xs italic text-slate-700 font-serif-heading">
                  {config.motto}
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {config.address} • Tel: {config.phone}
                </p>
              </div>
            </div>

            <div className="mt-2 inline-block bg-slate-950 text-white font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-sm">
              STUDENT TERMINAL ACADEMIC REPORT SHEET • {result.term} ({result.session})
            </div>
          </div>

          {/* Student Profile Card */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 border border-slate-300 rounded-xl p-4 bg-slate-50 mb-5 items-center">
            <div className="sm:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">STUDENT NAME:</span>
                <strong className="text-sm text-slate-950 uppercase">
                  {result.studentName}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">REGISTRATION NO:</span>
                <strong className="text-sm font-mono text-blue-900">
                  {result.regNumber}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">CLASS:</span>
                <strong className="text-sm text-slate-900">{result.classLevel}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">ACADEMIC SESSION:</span>
                <strong className="text-slate-900">{result.session}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">TERM:</span>
                <strong className="text-slate-900">{result.term}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">GENDER:</span>
                <strong className="text-slate-900">{result.gender || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">ATTENDANCE:</span>
                <strong className="text-slate-900">
                  {result.timesPresent ?? 64} / {result.timesSchoolOpened ?? 65} Days
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">RESUMPTION DATE:</span>
                <strong className="text-blue-900">
                  {result.nextTermResumptionDate || 'TBA'}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">STATUS:</span>
                <span className="inline-block bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-xs text-[11px]">
                  PROMOTED
                </span>
              </div>
            </div>

            {/* Student Photo */}
            <div className="sm:col-span-3 flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4">
              <div className="w-20 h-24 border border-slate-400 rounded-md overflow-hidden bg-slate-200 shadow-xs">
                {result.passportPhoto ? (
                  <img
                    src={result.passportPhoto}
                    alt={result.studentName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px]">
                    Photo
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">
                Official Photo
              </span>
            </div>
          </div>

          {/* Subject Scores Table */}
          <div className="overflow-x-auto mb-5 border border-slate-300 rounded-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                  <th className="py-2.5 px-3 border-r border-slate-700">#</th>
                  <th className="py-2.5 px-3 border-r border-slate-700">Subject</th>
                  <th className="py-2.5 px-3 border-r border-slate-700 text-center">
                    CA 1 (20)
                  </th>
                  <th className="py-2.5 px-3 border-r border-slate-700 text-center">
                    CA 2 (20)
                  </th>
                  <th className="py-2.5 px-3 border-r border-slate-700 text-center">
                    Exam (60)
                  </th>
                  <th className="py-2.5 px-3 border-r border-slate-700 text-center">
                    Total (100)
                  </th>
                  <th className="py-2.5 px-3 border-r border-slate-700 text-center">
                    Grade
                  </th>
                  <th className="py-2.5 px-3">Teacher Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {result.subjects.map((sub, idx) => (
                  <tr
                    key={sub.id || idx}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}
                  >
                    <td className="py-2 px-3 border-r border-slate-200 text-slate-500 font-mono">
                      {idx + 1}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-900">
                      {sub.subjectName}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 text-center font-mono">
                      {sub.ca1}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 text-center font-mono">
                      {sub.ca2}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 text-center font-mono font-medium">
                      {sub.exam}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 text-center font-mono font-bold text-slate-950">
                      {sub.total}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 text-center font-bold">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-xs text-[11px] ${
                          sub.grade.startsWith('A')
                            ? 'bg-emerald-100 text-emerald-800'
                            : sub.grade.startsWith('B')
                            ? 'bg-blue-100 text-blue-800'
                            : sub.grade.startsWith('C')
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {sub.grade}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-700 italic text-[11px]">
                      {sub.remark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Academic Performance Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-blue-50/70 border border-blue-200 p-4 rounded-xl mb-5 text-center">
            <div>
              <span className="text-[11px] text-blue-900 font-semibold uppercase block">
                Total Score
              </span>
              <p className="text-xl font-bold font-mono text-slate-950">
                {result.totalScore} / {result.maxPossibleScore || result.subjects.length * 100}
              </p>
            </div>
            <div>
              <span className="text-[11px] text-blue-900 font-semibold uppercase block">
                Average Score
              </span>
              <p className="text-xl font-bold font-mono text-blue-950">
                {result.averageScore}%
              </p>
            </div>
            <div>
              <span className="text-[11px] text-blue-900 font-semibold uppercase block">
                Overall Grade
              </span>
              <p className="text-xl font-bold text-emerald-700 font-serif-heading">
                {result.grade} (Distinction)
              </p>
            </div>
            <div>
              <span className="text-[11px] text-blue-900 font-semibold uppercase block">
                Class Position
              </span>
              <p className="text-xl font-bold font-mono text-amber-800">
                {result.position}
              </p>
            </div>
          </div>

          {/* Grading Key */}
          <div className="border border-slate-200 bg-slate-50 p-2.5 rounded-lg mb-5 text-[10px] text-slate-600 flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-slate-800 uppercase">Grading Standard:</span>
            <span>A1 (75–100%) Distinction</span>
            <span>B2 (70–74%) Very Good</span>
            <span>B3 (65–69%) Good</span>
            <span>C4–C6 (50–64%) Credit</span>
            <span>D7–E8 (40–49%) Pass</span>
            <span>F9 (0–39%) Fail</span>
          </div>

          {/* Remarks Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="border border-slate-300 p-3 rounded-lg bg-white space-y-1">
              <strong className="text-slate-800 uppercase text-[11px] block">
                Form Teacher's Remark:
              </strong>
              <p className="text-slate-700 italic leading-relaxed">
                "{result.teacherRemark || 'Hardworking and well-mannered student.'}"
              </p>
            </div>

            <div className="border border-slate-300 p-3 rounded-lg bg-white space-y-1">
              <strong className="text-slate-800 uppercase text-[11px] block">
                Principal's Remark & Endorsement:
              </strong>
              <p className="text-slate-700 italic leading-relaxed">
                "{result.principalRemark || 'An admirable performance. Keep excelling.'}"
              </p>
            </div>
          </div>

          {/* Signatures & Official Stamp */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-3 gap-6 text-center text-xs">
            <div className="space-y-4">
              <div className="border-b border-slate-400 w-3/4 mx-auto" />
              <p className="font-semibold text-slate-700">Form Teacher Signature</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 border border-dashed border-slate-400 rounded-full mx-auto flex items-center justify-center text-[9px] text-slate-400 uppercase font-bold text-center p-1">
                Official Stamp
              </div>
              <p className="font-semibold text-slate-700">School Seal</p>
            </div>
            <div className="space-y-4">
              <div className="border-b border-slate-400 w-3/4 mx-auto" />
              <p className="font-semibold text-slate-700">Principal's Signature</p>
            </div>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-6 italic">
            Computed and published via {config.name} Student Information Portal. Any alteration invalidates this record.
          </p>
        </div>
      </div>
    </div>
  );
};
