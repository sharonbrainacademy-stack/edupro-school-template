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
  DEFAULT_SCHOOL_CONFIG,
  DEFAULT_APPLICATIONS,
  DEFAULT_RESULTS,
  DEFAULT_GALLERY,
  DEFAULT_NEWS,
  DEFAULT_PINS,
  DEFAULT_TEACHERS,
} from './initialData';

const STORAGE_KEYS = {
  CONFIG: 'edupro_school_config',
  APPLICATIONS: 'edupro_school_applications',
  RESULTS: 'edupro_school_results',
  GALLERY: 'edupro_school_gallery',
  NEWS: 'edupro_school_news',
  PINS: 'edupro_school_pins',
  TEACHERS: 'edupro_school_teachers',
  ADMIN_AUTH: 'edupro_school_admin_auth',
};

// Safe JSON parser
function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// Config getters/setters
export function getSchoolConfig(): SchoolConfig {
  return safeGet<SchoolConfig>(STORAGE_KEYS.CONFIG, DEFAULT_SCHOOL_CONFIG);
}

export function saveSchoolConfig(config: SchoolConfig): void {
  safeSet(STORAGE_KEYS.CONFIG, config);
}

// Applications getters/setters
export function getApplications(): AdmissionApplication[] {
  return safeGet<AdmissionApplication[]>(STORAGE_KEYS.APPLICATIONS, DEFAULT_APPLICATIONS);
}

export function saveApplications(apps: AdmissionApplication[]): void {
  safeSet(STORAGE_KEYS.APPLICATIONS, apps);
}

export function addApplication(app: AdmissionApplication): void {
  const current = getApplications();
  saveApplications([app, ...current]);
}

export function deleteApplication(id: string): void {
  const current = getApplications();
  saveApplications(current.filter((item) => item.id !== id));
}

export function updateApplicationStatus(id: string, status: AdmissionApplication['status']): void {
  const current = getApplications();
  saveApplications(
    current.map((item) => (item.id === id ? { ...item, status } : item))
  );
}

// Results getters/setters
export function getResults(): StudentResult[] {
  return safeGet<StudentResult[]>(STORAGE_KEYS.RESULTS, DEFAULT_RESULTS);
}

export function saveResults(results: StudentResult[]): void {
  safeSet(STORAGE_KEYS.RESULTS, results);
}

export function addResult(result: StudentResult): void {
  const current = getResults();
  // If regNumber already exists for same term & session, replace it; else prepend
  const existsIndex = current.findIndex(
    (r) =>
      r.regNumber.toUpperCase() === result.regNumber.toUpperCase() &&
      r.term === result.term &&
      r.session === result.session
  );
  if (existsIndex >= 0) {
    current[existsIndex] = result;
    saveResults([...current]);
  } else {
    saveResults([result, ...current]);
  }
}

export function deleteResult(id: string): void {
  const current = getResults();
  saveResults(current.filter((item) => item.id !== id));
}

// Gallery getters/setters
export function getGallery(): GalleryPhoto[] {
  return safeGet<GalleryPhoto[]>(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
}

export function saveGallery(photos: GalleryPhoto[]): void {
  safeSet(STORAGE_KEYS.GALLERY, photos);
}

export function addGalleryPhoto(photo: GalleryPhoto): void {
  const current = getGallery();
  saveGallery([photo, ...current]);
}

export function deleteGalleryPhoto(id: string): void {
  const current = getGallery();
  saveGallery(current.filter((p) => p.id !== id));
}

// News getters/setters
export function getNews(): NewsItem[] {
  return safeGet<NewsItem[]>(STORAGE_KEYS.NEWS, DEFAULT_NEWS);
}

export function saveNews(news: NewsItem[]): void {
  safeSet(STORAGE_KEYS.NEWS, news);
}

export function addNewsItem(item: NewsItem): void {
  const current = getNews();
  saveNews([item, ...current]);
}

export function updateNewsItem(item: NewsItem): void {
  const current = getNews();
  saveNews(current.map((n) => (n.id === item.id ? item : n)));
}

export function deleteNewsItem(id: string): void {
  const current = getNews();
  saveNews(current.filter((n) => n.id !== id));
}

// PINs getters/setters
export function getPins(): ResultPin[] {
  return safeGet<ResultPin[]>(STORAGE_KEYS.PINS, DEFAULT_PINS);
}

export function savePins(pins: ResultPin[]): void {
  safeSet(STORAGE_KEYS.PINS, pins);
}

export function addPins(newPins: ResultPin[]): void {
  const current = getPins();
  savePins([...newPins, ...current]);
}

export function deletePin(id: string): void {
  const current = getPins();
  savePins(current.filter((p) => p.id !== id));
}

export function verifyAndUsePin(
  pinInput: string,
  regNumber: string,
  studentName?: string
): { valid: boolean; message: string; pinObj?: ResultPin } {
  const pins = getPins();
  const cleanPin = pinInput.trim().toUpperCase();
  const found = pins.find((p) => p.pin.toUpperCase() === cleanPin);

  if (!found) {
    return { valid: false, message: 'Invalid Result Checking PIN. Please check and try again.' };
  }

  // If already used by another regNumber
  if (found.assignedToRegNo && found.assignedToRegNo.toUpperCase() !== regNumber.trim().toUpperCase()) {
    return {
      valid: false,
      message: `This PIN was previously assigned to student ${found.assignedToRegNo}. It cannot be used for ${regNumber}.`,
    };
  }

  // Check max usage
  if (found.timesUsed >= found.maxUsage) {
    return {
      valid: false,
      message: `This PIN has exceeded its maximum usage limit (${found.maxUsage} times). Please obtain a fresh PIN from the school.`,
    };
  }

  // Record usage
  found.status = 'used';
  found.timesUsed = (found.timesUsed || 0) + 1;
  found.assignedToRegNo = regNumber.trim().toUpperCase();
  if (studentName) found.studentName = studentName;
  savePins(pins);

  return { valid: true, message: 'PIN verification successful', pinObj: found };
}

// Teachers getters/setters
export function getTeachers(): Teacher[] {
  return safeGet<Teacher[]>(STORAGE_KEYS.TEACHERS, DEFAULT_TEACHERS);
}

export function saveTeachers(teachers: Teacher[]): void {
  safeSet(STORAGE_KEYS.TEACHERS, teachers);
}

// Reset all to demo defaults
export function resetAllDataToDefault(): void {
  safeSet(STORAGE_KEYS.CONFIG, DEFAULT_SCHOOL_CONFIG);
  safeSet(STORAGE_KEYS.APPLICATIONS, DEFAULT_APPLICATIONS);
  safeSet(STORAGE_KEYS.RESULTS, DEFAULT_RESULTS);
  safeSet(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
  safeSet(STORAGE_KEYS.NEWS, DEFAULT_NEWS);
  safeSet(STORAGE_KEYS.PINS, DEFAULT_PINS);
  safeSet(STORAGE_KEYS.TEACHERS, DEFAULT_TEACHERS);
}

// Export complete data snapshot
export function exportAllDataJSON(): string {
  const data = {
    config: getSchoolConfig(),
    applications: getApplications(),
    results: getResults(),
    gallery: getGallery(),
    news: getNews(),
    pins: getPins(),
    teachers: getTeachers(),
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
  };
  return JSON.stringify(data, null, 2);
}

// Import complete data snapshot
export function importAllDataJSON(jsonStr: string): boolean {
  try {
    const data = JSON.parse(jsonStr);
    if (data.config) saveSchoolConfig(data.config);
    if (data.applications) saveApplications(data.applications);
    if (data.results) saveResults(data.results);
    if (data.gallery) saveGallery(data.gallery);
    if (data.news) saveNews(data.news);
    if (data.pins) savePins(data.pins);
    if (data.teachers) saveTeachers(data.teachers);
    return true;
  } catch (e) {
    console.error('Import failed:', e);
    return false;
  }
}

// Admin Session Auth
export function isAdminAuthenticated(): boolean {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

export function setAdminAuthenticated(auth: boolean): void {
  if (auth) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
}
