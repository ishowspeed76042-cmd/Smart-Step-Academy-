import { Faculty, ClassSchedule, OfferNotification, GalleryItem, VideoLicense } from "./types";

export const ACADEMY_CONFIG = {
  name: "Smart Step Academy",
  tagline: "Empowering Futures with Excellence in Education",
  location: "Back of Dhanvantari Clinic, Latur, Maharashtra",
  pincode: "413512",
  phonePrimary: "+91 8698767733",
  phoneSecondary: "+91 8698767733",
  email: "ishowspeed76042@gmail.com",
  logoUrl: "https://i.postimg.cc/pL7xyB7d/IMG-20260811-WA0004.jpg",
  bannerUrl: "https://i.postimg.cc/3xbrmhkf/IMG-20260811-WA0005.jpg",
  pamphletUrl: "https://i.postimg.cc/zG9ZqGb8/IMG-20260811-WA0003.jpg",
};

export const FACULTIES: Faculty[] = [
  {
    id: "f1",
    name: "Prof. Shravan Sir",
    title: "Senior Academician & Director",
    subjects: ["English", "Science"],
    experience: "12+ Years Teaching Experience",
    bio: "Specialist in conceptual English mastery, scientific reasoning, and exam strategies. Known for high result accuracy and personal attention to every student.",
    avatar: "",
  },
  {
    id: "f2",
    name: "Prof. Bhole Sir",
    title: "Senior Mathematics & Science Specialist",
    subjects: ["Mathematics", "Physics & Chemistry"],
    experience: "10+ Years Teaching Experience",
    bio: "Expert in shortcut mathematical problem solving, physics fundamentals, and board toppers training. Passionate about removing math fear in students.",
    avatar: "https://i.ibb.co/rKLf0VHd/IMG-20260811-WA0009.jpg",
  },
];

export const SCHEDULE: ClassSchedule[] = [
  {
    time: "4:00 PM - 5:00 PM",
    subject: "English",
    faculty: "Prof. Shravan Sir",
    description: "Grammar refinement, vocabulary development, literature comprehension & writing skills.",
    iconName: "BookOpen",
  },
  {
    time: "5:00 PM - 6:00 PM",
    subject: "Mathematics",
    faculty: "Prof. Bhole Sir",
    description: "Formula derivation, step-by-step problem solving, algebra, geometry & speed techniques.",
    iconName: "Calculator",
  },
  {
    time: "6:00 PM - 7:00 PM",
    subject: "Science",
    faculty: "Prof. Shravan Sir & Prof. Bhole Sir",
    description: "Physics, Chemistry, Biology concepts, practical diagrams & experiment analysis.",
    iconName: "Atom",
  },
];

export const INITIAL_OFFERS: OfferNotification[] = [
  {
    id: "o1",
    title: "🚀 Admissions Open for New Batches!",
    description: "Special Early Bird Discount available for 8th, 9th & 10th Standard Students. Reserve your seat today!",
    badge: "NEW BATCH",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "o2",
    title: "🏆 FREE Sunday Mock Test Series",
    description: "Special weekly assessment test series for Board students with personal analysis by Prof. Shravan Sir & Prof. Bhole Sir.",
    badge: "FREE MOCK TEST",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "g1",
    title: "Smart Step Academy Prospectus & Pamphlet",
    category: "Gallery",
    imageUrl: "https://i.postimg.cc/zG9ZqGb8/IMG-20260811-WA0003.jpg",
    uploadedAt: new Date().toISOString(),
  },
  {
    id: "g2",
    title: "Prof. Bhole Sir - Mathematics & Science Faculty",
    category: "Success Story",
    imageUrl: "https://i.ibb.co/rKLf0VHd/IMG-20260811-WA0009.jpg",
    uploadedAt: new Date().toISOString(),
  },
];

export const INITIAL_VIDEOS: VideoLicense[] = [
  {
    id: "v1",
    title: "10th Maths: Quadratic Equations Shortcut Tricks",
    subject: "Mathematics",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Master quadratic equations and speed formulas with Prof. Bhole Sir.",
    addedAt: new Date().toISOString(),
  },
  {
    id: "v2",
    title: "Science: Chemical Reactions & Equations Overview",
    subject: "Science",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Essential science lecture covering balancing chemical equations by Prof. Shravan Sir.",
    addedAt: new Date().toISOString(),
  },
];
