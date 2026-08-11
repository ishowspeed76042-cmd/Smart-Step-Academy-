export interface Faculty {
  id: string;
  name: string;
  title: string;
  subjects: string[];
  experience: string;
  bio: string;
  avatar: string;
}

export interface ClassSchedule {
  time: string;
  subject: string;
  faculty: string;
  description: string;
  iconName: string;
}

export interface QuickEnquiryData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  question: string;
}

export interface AdmissionFormData {
  firstName: string;
  lastName: string;
  parentName: string;
  email: string;
  mobileNumber: string;
  address: string;
  selectedClass: string;
  selectedSubjects: string[];
  preferredTime: string;
  photoBase64?: string;
  photoUrl?: string;
  aadharBase64?: string;
  aadharUrl?: string;
}

export interface SupportComplaintData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  reportTarget: string; // "Student", "Teacher", "Facility", "Other"
  targetName?: string;
  complaintDetails: string;
}

export interface SubmissionRecord {
  id: string;
  formType: "Enquiry" | "Admission" | "Support/Complaint";
  submittedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  address: string;
  question?: string;
  selectedClass?: string;
  selectedSubjects?: string[];
  preferredTime?: string;
  photoUrl?: string;
  aadharUrl?: string;
  reportTarget?: string;
  complaintDetails?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Gallery" | "Success Story" | "Classroom";
  imageUrl: string;
  uploadedAt: string;
}

export interface OfferNotification {
  id: string;
  title: string;
  description: string;
  badge?: string;
  isActive: boolean;
  createdAt: string;
}

export interface VideoLicense {
  id: string;
  title: string;
  subject: string;
  videoUrl: string;
  description: string;
  addedAt: string;
}

export interface AdminDatabaseState {
  submissions: SubmissionRecord[];
  gallery: GalleryItem[];
  offers: OfferNotification[];
  videos: VideoLicense[];
}
