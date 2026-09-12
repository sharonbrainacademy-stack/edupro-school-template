import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { AdmissionApplication } from '../../types/school';
import { AdmissionSlipModal } from '../admission/AdmissionSlipModal';
import {
  Search,
  Filter,
  Download,
  Printer,
  Trash2,
  Eye,
  CheckCircle,
  FileSpreadsheet,
  X,
  Calendar,
  Phone,
  Mail,
  User,
} from 'lucide-react';

export const AdminAdmissions: React.FC = () => {
  const {
    applications,
    deleteApplication,
    updateApplicationStatus,
    showToast,
  } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedAppForSlip, setSelectedAppForSlip] = useState<AdmissionApplication | null>(null);
  const [selectedAppForView, setSelectedAppForView] = useState<AdmissionApplication | null>(null);

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.studentFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.classApplyingFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.parentPhone.includes(searchQuery) ||
      app.parentFullName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ? true : app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Export to actual Excel CSV
  const handleExportCSV = () => {
    if (applications.length === 0) {
      alert('No applications to export.');
      return;
    }

    const headers = [
      'Application Number',
      'Student Full Name',
      'Class Applying For',
      'Date of Birth',
      'Gender',
      'State of Origin',
      'Parent Full Name',
      'Parent Phone',
      'Parent Email',
      'Residential Address',
      'Previous School',
      'Status',
      'Submission Date',
    ];

    const rows = applications.map((a) => [
      `"${a.applicationNumber}"`,
      `"${a.studentFullName.replace(/"/g, '""')}"`,
      `"${a.classApplyingFor}"`,
      `"${a.dateOfBirth}"`,
      `"${a.gender}"`,
      `"${a.stateOfOrigin}"`,
      `"${a.parentFullName.replace(/"/g, '""')}"`,
      `"${a.parentPhone}"`,
      `"${a.parentEmail || ''}"`,
      `"${a.residentialAddress.replace(/"/g, '""')}"`,
      `"${a.previousSchool || ''}"`,
      `"${a.status}"`,
      `"${new Date(a.submittedAt).toLocaleDateString('en-GB')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `admissions_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Exported applications to CSV spreadsheet!');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete application for "${name}"?`)) {
      deleteApplication(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold font-serif-heading text-slate-900">
            Admissions & Student Applications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Total {applications.length} submitted candidates • Filter, screen, and export records
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
        >
          <FileSpreadsheet size={16} />
          <span>Export to Excel (CSV)</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by student name, App ID, class, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={14} className="text-slate-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-600">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses ({applications.length})</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Admitted">Admitted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold">
                <th className="py-3 px-4">Photo</th>
                <th className="py-3 px-4">App ID</th>
                <th className="py-3 px-4">Candidate Full Name</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Parent Details</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4">
                    <div className="w-9 h-10 rounded-md overflow-hidden bg-slate-100 border border-slate-200">
                      {app.passportPhoto ? (
                        <img
                          src={app.passportPhoto}
                          alt={app.studentFullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <User size={14} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-900">
                    {app.applicationNumber}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {app.studentFullName}
                    <span className="block text-[11px] font-normal text-slate-500">
                      {app.gender} • DOB: {app.dateOfBirth}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {app.classApplyingFor}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-900 block">
                      {app.parentFullName}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px] block">
                      {app.parentPhone}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(app.submittedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        updateApplicationStatus(
                          app.id,
                          e.target.value as AdmissionApplication['status']
                        )
                      }
                      className={`text-[11px] font-bold px-2 py-1 rounded-md border cursor-pointer ${
                        app.status === 'Admitted'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : app.status === 'Under Review'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : app.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Admitted">Admitted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedAppForView(app)}
                        className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                        title="View Full Profile"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        onClick={() => setSelectedAppForSlip(app)}
                        className="p-1.5 rounded-lg text-blue-800 hover:bg-blue-100 transition cursor-pointer"
                        title="Print Official Admission Slip"
                      >
                        <Printer size={15} />
                      </button>

                      <button
                        onClick={() => handleDelete(app.id, app.studentFullName)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 transition cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p className="text-sm font-medium">No admission applications match your search criteria.</p>
          </div>
        )}
      </div>

      {/* Candidate Profile Details Modal */}
      {selectedAppForView && (
        <div
          onClick={() => setSelectedAppForView(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-mono text-blue-900 font-bold">
                  {selectedAppForView.applicationNumber}
                </span>
                <h3 className="text-xl font-bold font-serif-heading text-slate-900">
                  Candidate Dossier
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppForView(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-20 h-24 rounded-xl overflow-hidden border border-slate-300 bg-slate-100 shrink-0">
                <img
                  src={selectedAppForView.passportPhoto}
                  alt={selectedAppForView.studentFullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">
                  {selectedAppForView.studentFullName}
                </h4>
                <p className="text-xs text-blue-900 font-semibold">
                  Applying for: {selectedAppForView.classApplyingFor}
                </p>
                <p className="text-xs text-slate-600">
                  {selectedAppForView.gender} • Born {selectedAppForView.dateOfBirth} • Origin: {selectedAppForView.stateOfOrigin}
                </p>
                <span className="inline-block mt-1 bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
                  Status: {selectedAppForView.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h5 className="font-bold text-slate-900 uppercase">Sponsor Particulars</h5>
              <p><strong>Parent/Guardian:</strong> {selectedAppForView.parentFullName}</p>
              <p><strong>Phone:</strong> {selectedAppForView.parentPhone}</p>
              <p><strong>Email:</strong> {selectedAppForView.parentEmail || 'None'}</p>
              <p><strong>Address:</strong> {selectedAppForView.residentialAddress}</p>
              <p><strong>Occupation:</strong> {selectedAppForView.parentOccupation || 'N/A'}</p>
              <p><strong>Previous School:</strong> {selectedAppForView.previousSchool || 'N/A'} (Class: {selectedAppForView.lastClassPassed || 'N/A'})</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedAppForSlip(selectedAppForView);
                  setSelectedAppForView(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-950 transition cursor-pointer"
              >
                <Printer size={14} />
                <span>Open Printable Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slip Print Modal */}
      {selectedAppForSlip && (
        <AdmissionSlipModal
          application={selectedAppForSlip}
          onClose={() => setSelectedAppForSlip(null)}
        />
      )}
    </div>
  );
};
