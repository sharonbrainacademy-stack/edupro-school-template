import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useNavigation } from '../../context/NavigationContext';
import { isAdminAuthenticated, setAdminAuthenticated } from '../../utils/storage';
import { AdminLogin } from './AdminLogin';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminSettings } from './AdminSettings';
import { AdminAdmissions } from './AdminAdmissions';
import { AdminResults } from './AdminResults';
import { AdminPins } from './AdminPins';
import { AdminGallery } from './AdminGallery';
import { AdminNews } from './AdminNews';
import { AdminHelp } from './AdminHelp';
import { SchoolLogo } from '../SchoolLogo';
import {
  LayoutDashboard,
  Settings,
  Users,
  GraduationCap,
  KeyRound,
  Image as ImageIcon,
  Bell,
  HelpCircle,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { config, showToast } = useSchool();
  const { currentPage, navigateTo } = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    isAdminAuthenticated()
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    showToast('Logged out of Admin Portal');
  };

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  const navItems = [
    {
      id: 'admin',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'admin-settings',
      label: 'School Brand & Settings',
      icon: Settings,
    },
    {
      id: 'admin-admissions',
      label: 'Admissions & Applicants',
      icon: Users,
    },
    {
      id: 'admin-results',
      label: 'Student Results & Scores',
      icon: GraduationCap,
    },
    {
      id: 'admin-pins',
      label: 'Result Checker PINs',
      icon: KeyRound,
    },
    {
      id: 'admin-gallery',
      label: 'Campus Photo Gallery',
      icon: ImageIcon,
    },
    {
      id: 'admin-news',
      label: 'News & Announcements',
      icon: Bell,
    },
    {
      id: 'admin-help',
      label: 'Reseller & User Guide',
      icon: HelpCircle,
    },
  ];

  const renderActiveView = () => {
    switch (currentPage) {
      case 'admin-settings':
        return <AdminSettings />;
      case 'admin-admissions':
        return <AdminAdmissions />;
      case 'admin-results':
        return <AdminResults />;
      case 'admin-pins':
        return <AdminPins />;
      case 'admin-gallery':
        return <AdminGallery />;
      case 'admin-news':
        return <AdminNews />;
      case 'admin-help':
        return <AdminHelp />;
      case 'admin':
      default:
        return <AdminDashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Nav */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <SchoolLogo size="sm" showText={false} />
          <span className="font-bold text-xs truncate max-w-[180px]">
            {config.name} Admin
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <SchoolLogo size="md" showText={false} />
              <div className="overflow-hidden">
                <h1 className="font-serif-heading font-black text-sm text-white truncate leading-tight">
                  {config.name}
                </h1>
                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Admin Portal
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg text-[11px] text-slate-300">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Session: {config.academicSession}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigateTo(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: View Site & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => navigateTo('home')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
          >
            <ExternalLink size={15} />
            <span>View Public Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition cursor-pointer"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>

          <div className="pt-2 text-[10px] text-slate-500 text-center">
            <span>{config.designerName || 'EduPro School Template'}</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        {renderActiveView()}
      </main>
    </div>
  );
};
