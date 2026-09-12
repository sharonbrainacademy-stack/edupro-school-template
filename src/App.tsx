import React from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HeroSlider } from './components/public/HeroSlider';
import { AboutSection } from './components/public/AboutSection';
import { AcademicsSection } from './components/public/AcademicsSection';
import { AdmissionsSection } from './components/public/AdmissionsSection';
import { GallerySection } from './components/public/GallerySection';
import { NewsSection } from './components/public/NewsSection';
import { TeachersSection } from './components/public/TeachersSection';
import { ContactSection } from './components/public/ContactSection';
import { AdmissionPortal } from './components/admission/AdmissionPortal';
import { ResultChecker } from './components/result/ResultChecker';
import { AdminLayout } from './components/admin/AdminLayout';

const AppContent: React.FC = () => {
  const { currentPage } = useNavigation();

  // Route to Admin Panel
  if (currentPage.startsWith('admin')) {
    return <AdminLayout />;
  }

  // Route to Online Admission Portal
  if (currentPage === 'admission') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1">
          <AdmissionPortal />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Route to Result Checker Portal
  if (currentPage === 'result-checker') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1">
          <ResultChecker />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Route to Dedicated Gallery Page
  if (currentPage === 'gallery') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1 py-10">
          <GallerySection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Route to Dedicated News & Events Page
  if (currentPage === 'news') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1 py-10">
          <NewsSection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Route to Dedicated Contact Page
  if (currentPage === 'contact') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1 py-10">
          <ContactSection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Default: Public Homepage with all sections
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-900 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSlider />
        <AboutSection />
        <AcademicsSection />
        <AdmissionsSection />
        <GallerySection />
        <NewsSection />
        <TeachersSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </SchoolProvider>
  );
}
