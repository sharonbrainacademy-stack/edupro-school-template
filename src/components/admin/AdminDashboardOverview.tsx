import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useNavigation } from '../../context/NavigationContext';
import { AdmissionSlipModal } from '../admission/AdmissionSlipModal';
import { AdmissionApplication } from '../../types/school';
import {
  Users,
  GraduationCap,
  KeyRound,
  Image as ImageIcon,
  Bell,
  ArrowRight,
  Printer,
  Sparkles,
  CheckCircle,
  Clock,
  Settings,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';

export const AdminDashboardOverview: React.FC = () => {
  const {
    config,
    applications,
    results,
    pins,
    gallery,
    news,
    updateApplicationStatus,
  } = useSchool();
  const { navigateTo } = useNavigation();

  const [selectedAppForSlip, setSelectedAppForSlip] = useState<AdmissionApplication | null>(null);

  const pendingApps = applications.filter((a) => a.status === 'Pending').length;
  const unusedPins = pins.filter((p) => p.status === 'unused').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div
        className="rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{
          background: `linear-gradient(135deg, ${config.primaryColor || '#1e3a8a'} 0%, #0f172a 100%)`,
        }}
      >
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-0.5 rounded-full text-xs font-semibold">
            <Sparkles size={13} />
            <span>EduPro Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-heading">
            Welcome back, Administrator
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Managing <strong className="text-white">{config.name}</strong>. All updates made here are saved instantly to your site and live for parents.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold border border-white/20 transition cursor-pointer"
          >
            <ExternalLink size={15} />
            <span>View Public Website</span>
          </button>

          <button
            onClick={() => navigateTo('admin-settings')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition shadow-md cursor-pointer"
          >
            <Settings size={15} />
            <span>Edit School Settings</span>
          </button>
        </div>
      </div>

      {/* Metric Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div
          onClick={() => navigateTo('admin-admissions')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
              <Users size={24} />
            </div>
            {pendingApps > 0 && (
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-md">
                {pendingApps} New
              </span>
            )}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Admission Applications
            </p>
            <h3 className="text-3xl font-bold font-mono text-slate-900 mt-1">
              {applications.length}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-blue-800 font-semibold pt-1">
            <span>Manage applications</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => navigateTo('admin-results')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <GraduationCap size={24} />
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-md">
              {config.currentTerm}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Student Results on File
            </p>
            <h3 className="text-3xl font-bold font-mono text-slate-900 mt-1">
              {results.length}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-800 font-semibold pt-1">
            <span>Upload or view scores</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => navigateTo('admin-pins')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <KeyRound size={24} />
            </div>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-md">
              {unusedPins} Ready
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Result Checker PINs
            </p>
            <h3 className="text-3xl font-bold font-mono text-slate-900 mt-1">
              {pins.length}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-800 font-semibold pt-1">
            <span>Generate batch PINs</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => navigateTo('admin-gallery')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center">
              <ImageIcon size={24} />
            </div>
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-0.5 rounded-md">
              {news.length} News
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Gallery & Media
            </p>
            <h3 className="text-3xl font-bold font-mono text-slate-900 mt-1">
              {gallery.length}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-purple-800 font-semibold pt-1">
            <span>Add photos & articles</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Quick Action Buttons Strip */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="font-serif-heading font-bold text-base text-slate-900">
          Quick Administrative Tasks
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => navigateTo('admin-results')}
            className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer"
          >
            <PlusCircle size={16} className="text-blue-800" />
            <span>Add Student Result</span>
          </button>
          <button
            onClick={() => navigateTo('admin-pins')}
            className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer"
          >
            <KeyRound size={16} className="text-amber-600" />
            <span>Generate 20 PINs</span>
          </button>
          <button
            onClick={() => navigateTo('admin-news')}
            className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer"
          >
            <Bell size={16} className="text-purple-600" />
            <span>Post New Announcement</span>
          </button>
          <button
            onClick={() => navigateTo('admin-settings')}
            className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer"
          >
            <Settings size={16} className="text-slate-700" />
            <span>Change School Branding</span>
          </button>
        </div>
      </div>

      {/* Recent Admissions Applications Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-heading font-bold text-lg text-slate-900">
              Recent Admission Inquiries & Applications
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review new candidates, update admission status, and print examination slips.
            </p>
          </div>
          <button
            onClick={() => navigateTo('admin-admissions')}
            className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({applications.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold">
                <th className="py-3 px-4">App ID</th>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Parent Phone</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.slice(0, 5).map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-blue-900">
                    {app.applicationNumber}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {app.studentFullName}
                  </td>
                  <td className="py-3 px-4 text-slate-700">{app.classApplyingFor}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{app.parentPhone}</td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(app.submittedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
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
                    <button
                      onClick={() => setSelectedAppForSlip(app)}
                      className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer"
                      title="Print Official Admission Slip"
                    >
                      <Printer size={13} />
                      <span>Print Slip</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slip Modal */}
      {selectedAppForSlip && (
        <AdmissionSlipModal
          application={selectedAppForSlip}
          onClose={() => setSelectedAppForSlip(null)}
        />
      )}
    </div>
  );
};
