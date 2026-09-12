import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  HelpCircle,
  Sparkles,
  BookOpen,
  Palette,
  Users,
  GraduationCap,
  KeyRound,
  FileSpreadsheet,
  Globe,
  DollarSign,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const AdminHelp: React.FC = () => {
  const { config } = useSchool();

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-2">
          <BookOpen size={14} />
          <span>Proprietor & Reseller Documentation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-slate-900">
          How to Manage & Resell Your School Website
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Zero coding knowledge required. Follow these simple steps to operate your portal or configure it for new school clients.
        </p>
      </div>

      {/* Guide 1: Brand & Logo Customization */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h3 className="font-serif-heading font-bold text-lg text-slate-900">
              Customizing School Identity & Colors
            </h3>
            <p className="text-xs text-slate-500">
              Tailoring the template for any primary or secondary school in 2 minutes.
            </p>
          </div>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pl-4 list-disc marker:text-blue-800 leading-relaxed">
          <li>
            Navigate to <strong>Settings</strong> in the admin sidebar.
          </li>
          <li>
            Under <strong>School Color Theme</strong>, select one of the 5 curated presets (e.g. Royal Blue & Gold, Forest Emerald, Crimson Burgundy) or pick your school's exact blazer colors using the color picker.
          </li>
          <li>
            Upload the official school badge/crest by clicking <strong>Upload Logo File</strong>.
          </li>
          <li>
            Enter your School Name, Motto, Address, Phone Numbers, and WhatsApp number.
          </li>
          <li>
            Click <strong>Save & Update Website Instantly</strong>. The public website updates immediately without needing to reload or rebuild code!
          </li>
        </ul>
      </div>

      {/* Guide 2: Admissions & Online Applications */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <h3 className="font-serif-heading font-bold text-lg text-slate-900">
              Managing Online Admissions & Printable Slips
            </h3>
            <p className="text-xs text-slate-500">
              Eliminate paper application queues and manual entry.
            </p>
          </div>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pl-4 list-disc marker:text-emerald-800 leading-relaxed">
          <li>
            Prospective parents click <strong>"Apply for Admission"</strong> on the public website.
          </li>
          <li>
            They fill out the candidate's bio-data, parent sponsor info, and upload a passport photo.
          </li>
          <li>
            The system instantly generates an official Application ID (e.g. <code>SCH/2026/0004</code>) and produces a beautiful, printable PDF Entrance Examination Slip with verification stamps.
          </li>
          <li>
            Inside <strong>Admissions</strong> in the admin panel, you can search applicants, change statuses (Pending → Admitted), view dossier cards, and click <strong>Export to Excel (CSV)</strong> to download an attendance roster.
          </li>
        </ul>
      </div>

      {/* Guide 3: Terminal Results & Scratchcard PINs */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <h3 className="font-serif-heading font-bold text-lg text-slate-900">
              Terminal Results & Monetizing Scratchcard PINs
            </h3>
            <p className="text-xs text-slate-500">
              Create an automated revenue stream for the school bursary.
            </p>
          </div>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pl-4 list-disc marker:text-amber-800 leading-relaxed">
          <li>
            Under <strong>Results</strong>, click <strong>"Add Student Result"</strong> or <strong>"Upload CSV"</strong> to record CA and Exam scores. The system automatically computes continuous assessments, total scores, overall percentage, WAEC-standard letter grades (A1, B2, etc.), and class positions!
          </li>
          <li>
            Go to <strong>Result PINs</strong>, choose batch size (e.g. 50 PINs), and click <strong>Generate Now</strong>.
          </li>
          <li>
            Click <strong>Print Scratchcard Slips</strong> to print sheets of official cards that can be sold to parents for ₦500 – ₦2,000 each at the accountant's desk.
          </li>
          <li>
            Parents visit the <strong>Check Result</strong> page, type their child's Registration Number and 10-digit PIN, and can immediately view and print the official signed result sheet.
          </li>
        </ul>
      </div>

      {/* Guide 4: Reseller Monetization Blueprint (₦30k Promo) */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-5">
        <div className="flex items-center gap-2 text-amber-400">
          <DollarSign size={24} />
          <h3 className="font-serif-heading font-bold text-xl">
            Reseller Playbook: Selling to Schools for ₦30,000 – ₦100,000
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          How web designers and agencies can use this EduPro template to close 5 to 20 schools every academic session:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-white/10 border border-white/10 rounded-2xl p-4 space-y-2">
            <h4 className="font-bold text-amber-300 uppercase tracking-wide">
              The ₦30,000 Promo Package
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Target private nursery and primary schools with this irresistible pitch: <em>"Get a modern website with online admission slip generator and mobile result portal for just ₦30,000 one-off!"</em>
            </p>
            <p className="text-emerald-400 font-semibold">
              Host on Netlify or Cloudflare Pages for ₦0/month forever.
            </p>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-2xl p-4 space-y-2">
            <h4 className="font-bold text-amber-300 uppercase tracking-wide">
              Upsell to ₦80,000 – ₦150,000
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Add a custom Nigerian domain (e.g. <code>.sch.ng</code> for ₦5,000/yr), professional school email addresses (e.g. <code>info@apexacademy.sch.ng</code>), and termly result upload service!
            </p>
            <p className="text-amber-300 font-semibold">
              Sell scratchcard PIN batches every term for recurring profit.
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
          <strong className="text-white block">Free 5-Minute Netlify / Cloudflare Deployment:</strong>
          <ol className="list-decimal list-inside space-y-1 pl-1">
            <li>Run <code>npm run build</code> to produce the static <code>dist/</code> folder.</li>
            <li>Drag & drop the <code>dist/</code> folder directly onto app.netlify.com or Cloudflare Pages.</li>
            <li>Connect the school’s domain name. That's it! No backend or database hosting costs needed.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
