import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SchoolConfig,
  AdmissionApplication,
  StudentResult,
  GalleryPhoto,
  NewsItem,
  ResultPin,
  Teacher,
} from '../types/school';
import {
  getSchoolConfig,
  saveSchoolConfig,
  getApplications,
  addApplication as dbAddApplication,
  deleteApplication as dbDeleteApplication,
  updateApplicationStatus as dbUpdateApplicationStatus,
  getResults,
  addResult as dbAddResult,
  deleteResult as dbDeleteResult,
  getGallery,
  addGalleryPhoto as dbAddGalleryPhoto,
  deleteGalleryPhoto as dbDeleteGalleryPhoto,
  getNews,
  addNewsItem as dbAddNewsItem,
  updateNewsItem as dbUpdateNewsItem,
  deleteNewsItem as dbDeleteNewsItem,
  getPins,
  addPins as dbAddPins,
  deletePin as dbDeletePin,
  verifyAndUsePin as dbVerifyAndUsePin,
  getTeachers,
  resetAllDataToDefault,
} from '../utils/storage';

interface SchoolContextType {
  config: SchoolConfig;
  updateConfig: (newConfig: Partial<SchoolConfig>) => void;
  applications: AdmissionApplication[];
  submitApplication: (appData: Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'submittedAt' | 'status'>) => AdmissionApplication;
  deleteApplication: (id: string) => void;
  updateApplicationStatus: (id: string, status: AdmissionApplication['status']) => void;
  results: StudentResult[];
  submitResult: (result: StudentResult) => void;
  addResult: (result: any) => void;
  deleteResult: (id: string) => void;
  gallery: any[];
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id' | 'dateAdded'>) => void;
  addGalleryItem: (item: any) => void;
  deleteGalleryPhoto: (id: string) => void;
  deleteGalleryItem: (id: string) => void;
  news: any[];
  addNewsItem: (item: any) => void;
  updateNewsItem: (idOrItem: string | NewsItem, partial?: any) => void;
  deleteNewsItem: (id: string) => void;
  pins: any[];
  generatePins: (count: number) => ResultPin[];
  generatePin: (count: number) => ResultPin[];
  deletePin: (id: string) => void;
  verifyPin: (pin: string, regNumber: string, studentName?: string) => { valid: boolean; message: string; pinObj?: ResultPin };
  teachers: Teacher[];
  resetData: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SchoolConfig>(getSchoolConfig);
  const [applications, setApplications] = useState<AdmissionApplication[]>(getApplications);
  const [results, setResults] = useState<StudentResult[]>(getResults);
  const [gallery, setGallery] = useState<GalleryPhoto[]>(getGallery);
  const [news, setNews] = useState<NewsItem[]>(getNews);
  const [pins, setPins] = useState<ResultPin[]>(getPins);
  const [teachers, setTeachers] = useState<Teacher[]>(getTeachers);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apply primary & secondary theme colors to document root
  useEffect(() => {
    const root = document.documentElement;
    if (config.primaryColor) {
      root.style.setProperty('--school-primary', config.primaryColor);
    }
    if (config.secondaryColor) {
      root.style.setProperty('--school-secondary', config.secondaryColor);
    }
    if (config.accentColor) {
      root.style.setProperty('--school-accent', config.accentColor);
    }
  }, [config.primaryColor, config.secondaryColor, config.accentColor]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const updateConfig = (partial: Partial<SchoolConfig>) => {
    const updated = { ...config, ...partial };
    saveSchoolConfig(updated);
    setConfig(updated);
    showToast('School configuration updated successfully!');
  };

  const submitApplication = (
    appData: Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'submittedAt' | 'status'>
  ): AdmissionApplication => {
    const year = new Date().getFullYear();
    const count = applications.length + 1;
    const formattedCount = String(count).padStart(4, '0');
    const applicationNumber = `SCH/${year}/${formattedCount}`;

    const newApp: AdmissionApplication = {
      ...appData,
      id: 'app-' + Date.now(),
      applicationNumber,
      submittedAt: new Date().toISOString(),
      status: 'Pending',
      examDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    dbAddApplication(newApp);
    setApplications(getApplications());
    showToast(`Application ${applicationNumber} submitted successfully!`);
    return newApp;
  };

  const deleteApplication = (id: string) => {
    dbDeleteApplication(id);
    setApplications(getApplications());
    showToast('Application record deleted.');
  };

  const updateApplicationStatus = (id: string, status: AdmissionApplication['status']) => {
    dbUpdateApplicationStatus(id, status);
    setApplications(getApplications());
    showToast(`Application status changed to ${status}.`);
  };

  const submitResult = (result: StudentResult) => {
    dbAddResult(result);
    setResults(getResults());
    showToast(`Result for ${result.studentName} (${result.regNumber}) saved.`);
  };

  const addResult = (res: any) => {
    const fullResult: StudentResult = {
      ...res,
      id: res.id || 'res-' + Date.now(),
      maxPossibleScore: res.maxPossibleScore || (res.subjects?.length || 5) * 100,
      publishedAt: res.publishedAt || new Date().toISOString(),
      pin: res.pin || 'PIN-AUTO-' + Math.floor(1000 + Math.random() * 9000),
    };
    submitResult(fullResult);
  };

  const deleteResult = (id: string) => {
    dbDeleteResult(id);
    setResults(getResults());
    showToast('Student result deleted.');
  };

  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id' | 'dateAdded'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: 'gal-' + Date.now(),
      dateAdded: new Date().toISOString().split('T')[0],
    };
    dbAddGalleryPhoto(newPhoto);
    setGallery(getGallery());
    showToast('New photo added to school gallery.');
  };

  const addGalleryItem = (item: any) => {
    addGalleryPhoto({
      title: item.title,
      category: item.category || 'Campus',
      imageUrl: item.url || item.imageUrl,
      description: item.caption || item.description,
    });
  };

  const deleteGalleryPhoto = (id: string) => {
    dbDeleteGalleryPhoto(id);
    setGallery(getGallery());
    showToast('Photo removed from gallery.');
  };

  const deleteGalleryItem = (id: string) => {
    deleteGalleryPhoto(id);
  };

  const addNewsItem = (item: any) => {
    const newItem: NewsItem = {
      id: 'news-' + Date.now(),
      title: item.title,
      excerpt: item.summary || item.excerpt || '',
      content: item.content || item.summary || '',
      category: item.category || 'News',
      imageUrl: item.image || item.imageUrl || '',
      publishDate: item.date || new Date().toISOString().split('T')[0],
      author: item.author || 'School Administration',
    };
    dbAddNewsItem(newItem);
    setNews(getNews());
    showToast('News & Event published successfully.');
  };

  const updateNewsItem = (idOrItem: string | NewsItem, partial?: any) => {
    if (typeof idOrItem === 'string') {
      const existing = news.find((n) => n.id === idOrItem);
      if (existing) {
        const updated: NewsItem = {
          ...existing,
          title: partial.title !== undefined ? partial.title : existing.title,
          excerpt: partial.summary !== undefined ? partial.summary : existing.excerpt,
          content: partial.content !== undefined ? partial.content : existing.content,
          category: partial.category !== undefined ? partial.category : existing.category,
          imageUrl: partial.image !== undefined ? partial.image : existing.imageUrl,
          publishDate: partial.date !== undefined ? partial.date : existing.publishDate,
        };
        dbUpdateNewsItem(updated);
      }
    } else {
      dbUpdateNewsItem(idOrItem);
    }
    setNews(getNews());
    showToast('News item updated.');
  };

  const deleteNewsItem = (id: string) => {
    dbDeleteNewsItem(id);
    setNews(getNews());
    showToast('News item removed.');
  };

  const generatePins = (count: number): ResultPin[] => {
    const created: ResultPin[] = [];
    const existing = getPins();
    const startNum = existing.length + 1;

    for (let i = 0; i < count; i++) {
      const p1 = Math.floor(1000 + Math.random() * 9000);
      const p2 = Math.floor(1000 + Math.random() * 9000);
      const pinCode = `PIN-${p1}-${p2}`;
      const serialNumber = `SN-2026-${String(startNum + i).padStart(4, '0')}`;

      created.push({
        id: 'pin-' + Date.now() + '-' + i,
        pin: pinCode,
        serialNumber,
        status: 'unused',
        timesUsed: 0,
        maxUsage: 5,
        createdAt: new Date().toISOString().split('T')[0],
      });
    }

    dbAddPins(created);
    setPins(getPins());
    showToast(`${count} new Result PINs generated!`);
    return created;
  };

  const generatePin = (count: number): ResultPin[] => {
    return generatePins(count);
  };

  const deletePin = (id: string) => {
    dbDeletePin(id);
    setPins(getPins());
    showToast('PIN deleted.');
  };

  const verifyPin = (pin: string, regNumber: string, studentName?: string) => {
    const res = dbVerifyAndUsePin(pin, regNumber, studentName);
    setPins(getPins());
    return res;
  };

  const resetData = () => {
    resetAllDataToDefault();
    setConfig(getSchoolConfig());
    setApplications(getApplications());
    setResults(getResults());
    setGallery(getGallery());
    setNews(getNews());
    setPins(getPins());
    setTeachers(getTeachers());
    showToast('All school data restored to default demo state.');
  };

  return (
    <SchoolContext.Provider
      value={{
        config,
        updateConfig,
        applications,
        submitApplication,
        deleteApplication,
        updateApplicationStatus,
        results,
        submitResult,
        addResult,
        deleteResult,
        gallery,
        addGalleryPhoto,
        addGalleryItem,
        deleteGalleryPhoto,
        deleteGalleryItem,
        news,
        addNewsItem,
        updateNewsItem,
        deleteNewsItem,
        pins,
        generatePins,
        generatePin,
        deletePin,
        verifyPin,
        teachers,
        resetData,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </SchoolContext.Provider>
  );
};

export const useSchool = (): SchoolContextType => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within SchoolProvider');
  }
  return context;
};
