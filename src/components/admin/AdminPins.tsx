import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { ResultPin } from '../../types/school';
import {
  KeyRound,
  PlusCircle,
  Download,
  Printer,
  Trash2,
  CheckCircle,
  Copy,
  Sparkles,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const AdminPins: React.FC = () => {
  const { config, pins, generatePin, deletePin, showToast } = useSchool();
  const [generateCount, setGenerateCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleGenerate = () => {
    generatePin(generateCount);
  };

  const handleCopyPin = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Copied PIN: ${code}`);
  };

  const handleExportCSV = () => {
    if (pins.length === 0) return;
    const header = 'PIN Code,Status,Student RegNo,Student Name,Times Used,Max Uses,Date Generated\n';
    const rows = pins
      .map(
        (p) =>
          `"${p.pinCode}","${p.status}","${p.usedByRegNumber || ''}","${p.usedByStudentName || ''}","${p.usedCount}","${p.maxUses}","${p.createdAt}"`
      )
      .join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `scratchcard_pins_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('PINs exported to CSV file!');
  };

  const filteredPins = pins.filter(
    (p) =>
      p.pinCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.usedByRegNumber && p.usedByRegNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.usedByStudentName && p.usedByStudentName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold font-serif-heading text-slate-900">
            Result Checker PINs & Scratchcards
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Generate secure 10-digit authentication tokens for students/parents to check terminal result cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPrintModal(true)}
            className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Printer size={15} />
            <span>Print Scratchcard Slips</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Generation Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-6 rounded-3xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif-heading font-bold text-lg flex items-center justify-center sm:justify-start gap-2">
            <Sparkles size={18} className="text-amber-400" />
            <span>Bulk PIN Generator</span>
          </h3>
          <p className="text-xs text-slate-300">
            Select batch volume to create new unassigned scratchcard codes instantly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={generateCount}
            onChange={(e) => setGenerateCount(Number(e.target.value))}
            className="bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
          >
            <option value={5}>Generate 5 PINs</option>
            <option value={10}>Generate 10 PINs</option>
            <option value={20}>Generate 20 PINs</option>
            <option value={50}>Generate 50 PINs</option>
          </select>

          <button
            onClick={handleGenerate}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
          >
            <PlusCircle size={15} />
            <span>Generate Now</span>
          </button>
        </div>
      </div>

      {/* Search & Stats */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by PIN or student reg number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-600">
            Total: <strong>{pins.length}</strong>
          </span>
          <span className="text-emerald-700 font-semibold">
            Unused: <strong>{pins.filter((p) => p.status === 'unused').length}</strong>
          </span>
          <span className="text-blue-800 font-semibold">
            Active: <strong>{pins.filter((p) => p.status === 'active').length}</strong>
          </span>
        </div>
      </div>

      {/* PINs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold">
                <th className="py-3 px-4">PIN Code</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned / Used By</th>
                <th className="py-3 px-4">Student Reg Number</th>
                <th className="py-3 px-4 text-center">Usage Count</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPins.map((pin) => (
                <tr key={pin.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                        {pin.pinCode}
                      </span>
                      <button
                        onClick={() => handleCopyPin(pin.pinCode)}
                        className="text-slate-400 hover:text-blue-900 p-1 cursor-pointer"
                        title="Copy PIN"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        pin.status === 'unused'
                          ? 'bg-emerald-100 text-emerald-800'
                          : pin.status === 'active'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {pin.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {pin.usedByStudentName || '— (Ready for sale / issue)'}
                  </td>
                  <td className="py-3 px-4 font-mono text-blue-900">
                    {pin.usedByRegNumber || '—'}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-slate-700">
                    {pin.usedCount} / {pin.maxUses}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(pin.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => deletePin(pin.id)}
                      className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                      title="Delete PIN"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Scratchcards Sheet Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col border border-slate-200">
            <div className="no-print bg-slate-900 text-white p-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Scratchcard Sheet Ready to Print
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={15} />
                  <span>Print Sheet (PDF)</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="bg-slate-800 text-slate-300 hover:bg-slate-700 p-2 rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Print Area: Grid of cards */}
            <div className="print-container p-6 bg-white overflow-y-auto grid grid-cols-2 gap-4">
              {pins.slice(0, 10).map((pin, i) => (
                <div
                  key={pin.id || i}
                  className="border-2 border-dashed border-slate-400 p-4 rounded-xl bg-slate-50 text-slate-900 space-y-2 relative"
                >
                  <div className="flex items-center justify-between border-b border-slate-300 pb-1">
                    <span className="font-serif-heading font-black text-xs uppercase tracking-tight text-blue-950">
                      {config.name}
                    </span>
                    <span className="text-[10px] font-bold bg-amber-200 text-amber-950 px-2 py-0.5 rounded">
                      RESULT SCRATCHCARD
                    </span>
                  </div>

                  <div className="text-center py-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      Secret Access PIN
                    </span>
                    <strong className="text-lg font-mono font-black text-slate-950 tracking-widest">
                      {pin.pinCode}
                    </strong>
                  </div>

                  <p className="text-[9px] text-slate-500 leading-tight">
                    Visit the school website result portal. Valid for {pin.maxUses} views for session {config.academicSession}.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
