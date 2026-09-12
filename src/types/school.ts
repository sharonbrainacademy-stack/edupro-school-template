export interface SchoolConfig {
  name: string;
  motto: string;
  logoUrl: string;
  address: string;
  phone: string;
  altPhone?: string;
  whatsapp: string;
  email: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  aboutTitle: string;
  aboutHistory: string;
  mission: string;
  vision: string;
  coreValues: string[];
  admissionNotice: string;
  admissionIsOpen: boolean;
  academicSession: string;
  currentTerm: string;
  applicationFee: number;
  currencySymbol: string;
  designerName: string;
  designerUrl: string;
  googleMapsEmbedUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  studentFullName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  classApplyingFor: string;
  religion?: string;
  stateOfOrigin: string;
  lga?: string;
  parentFullName: string;
  parentPhone: string;
  parentEmail: string;
  parentOccupation?: string;
  residentialAddress: string;
  previousSchool: string;
  lastClassPassed: string;
  passportPhoto: string;
  submittedAt: string;
  status: 'Pending' | 'Under Review' | 'Admitted' | 'Rejected';
  examDate?: string;
  notes?: string;
}

export interface SubjectScore {
  id: string;
  subjectName: string;
  ca1: number; // e.g. /20
  ca2: number; // e.g. /20
  exam: number; // e.g. /60
  total: number; // /100
  grade: string; // A, B, C, D, E, F
  remark: string; // Excellent, Good, Credit, Pass, Fail
}

export interface StudentResult {
  id: string;
  regNumber: string;
  studentName: string;
  classLevel: string;
  term: string; // 1st Term, 2nd Term, 3rd Term
  session: string; // 2025/2026
  gender: string;
  passportPhoto?: string;
  subjects: SubjectScore[];
  totalScore: number;
  maxPossibleScore: number;
  averageScore: number;
  grade: string;
  position: string; // e.g. "3rd out of 38"
  pin: string;
  principalRemark: string;
  teacherRemark: string;
  timesSchoolOpened?: number;
  timesPresent?: number;
  nextTermResumptionDate: string;
  publishedAt: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Campus' | 'Academics' | 'Sports' | 'Events' | 'Laboratory';
  imageUrl: string;
  description?: string;
  dateAdded: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'News' | 'Event' | 'Announcement';
  imageUrl: string;
  publishDate: string;
  eventDate?: string;
  author: string;
}

export interface ResultPin {
  id: string;
  pin: string;
  serialNumber: string;
  status: 'unused' | 'used';
  assignedToRegNo?: string;
  studentName?: string;
  timesUsed: number;
  maxUsage: number;
  createdAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  qualification: string;
  image: string;
  bio: string;
}
