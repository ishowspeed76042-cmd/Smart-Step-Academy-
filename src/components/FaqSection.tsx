import React, { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Building,
  HelpCircle as InquiryIcon,
  Globe,
  Moon,
  Sun,
  Settings,
  Code,
  GraduationCap,
  Clock,
  MapPin,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface FaqSectionProps {
  onOpenEnquiry: () => void;
  onOpenAdmission: () => void;
  onOpenPamphlet: () => void;
}

interface FaqItem {
  id: string;
  category: "structure" | "inquiries" | "website" | "night" | "settings" | "code";
  categoryLabel: string;
  question: string;
  answer: string;
  badge?: string;
  actionText?: string;
  actionHandler?: "enquiry" | "admission" | "pamphlet";
  details?: string[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onOpenEnquiry,
  onOpenAdmission,
  onOpenPamphlet,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [highContrastNight, setHighContrastNight] = useState(false);

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "structure", label: "Physical Structure & Timings", icon: Building },
    { id: "inquiries", label: "Inquiries & Admissions", icon: InquiryIcon },
    { id: "website", label: "Website Features", icon: Globe },
    { id: "night", label: "Night Toggle & Theme", icon: Moon },
    { id: "settings", label: "Settings & Admin", icon: Settings },
    { id: "code", label: "Code & Engine", icon: Code },
  ];

  const faqs: FaqItem[] = [
    // 1. Physical Structure & Timings
    {
      id: "faq-1",
      category: "structure",
      categoryLabel: "Physical Structure & Timings",
      question: "Where is Smart Step Academy physically located and what are the campus details?",
      answer:
        "Smart Step Academy is located at the Back of Dhanvantari Clinic, Latur, Maharashtra - PIN Code 413512. The campus features structured classrooms equipped with teaching boards, student study desks, and dedicated faculty quarters for Prof. Shravan Sir and Prof. Bhole Sir.",
      badge: "Latur Campus",
      details: [
        "Full Address: Back of Dhanvantari Clinic, Latur, Maharashtra - 413512",
        "Target Classes: 8th, 9th, and 10th Standard SSC Board Students",
        "Key Professors: Prof. Shravan Sir & Prof. Bhole Sir",
        "Core Subjects: English, Mathematics, and Science",
      ],
    },
    {
      id: "faq-2",
      category: "structure",
      categoryLabel: "Physical Structure & Timings",
      question: "What are the exact daily class timings and batch schedules?",
      answer:
        "Classes run daily in the evening from 4:00 PM to 7:00 PM, structured into three focused 1-hour subject periods to ensure maximum retention without causing student fatigue.",
      badge: "4:00 PM - 7:00 PM Daily",
      actionText: "Check Full Timings Schedule",
      details: [
        "4:00 PM – 5:00 PM: English (Prof. Shravan Sir)",
        "5:00 PM – 6:00 PM: Mathematics (Prof. Bhole Sir)",
        "6:00 PM – 7:00 PM: Science (Prof. Shravan Sir & Prof. Bhole Sir)",
        "Regular test series and weekend revision sessions before SSC Board exams.",
      ],
    },

    // 2. Inquiries & Admissions
    {
      id: "faq-3",
      category: "inquiries",
      categoryLabel: "Inquiries & Admissions",
      question: "How do I submit an Inquiry or apply for Student Admission online?",
      answer:
        "You can submit an inquiry or complete the full admission form directly through our website. Both forms feature an instant Email OTP verification step to confirm your contact details.",
      badge: "OTP Verified",
      actionText: "Fill Quick Enquiry Form",
      actionHandler: "enquiry",
      details: [
        "Step 1: Enter Student & Parent details along with mobile number and email.",
        "Step 2: Enter the 6-digit Email OTP dispatched directly to your inbox.",
        "Step 3: Upload Student Passport Photo & Aadhar Card (for Admission forms).",
        "Step 4: Receive instant email confirmation and direct phone call from our admissions team.",
      ],
    },
    {
      id: "faq-4",
      category: "inquiries",
      categoryLabel: "Inquiries & Admissions",
      question: "What documents are required for admission approval?",
      answer:
        "For admission registration, students need to upload a recent Student Passport Photograph and a copy of their Aadhar Card via our secure admission portal.",
      badge: "Photo & Aadhar Required",
      actionText: "Open Student Admission Form",
      actionHandler: "admission",
      details: [
        "Student Passport-size Photograph (JPEG/PNG)",
        "Student or Parent Aadhar Card Image",
        "Mobile Number capable of receiving calls and SMS",
        "Valid Email Address for receiving receipt & OTP confirmations",
      ],
    },

    // 3. Website
    {
      id: "faq-5",
      category: "website",
      categoryLabel: "Website Features",
      question: "What digital tools and features does the Smart Step Academy website offer?",
      answer:
        "Our web platform provides a complete digital experience for parents and students, including interactive batch schedules, professor bios, online gallery photos, embedded video lecture streams, downloadable prospectus pamphlets, and a direct student support/complaint portal.",
      badge: "Full-Stack Portal",
      actionText: "View Official Brochure",
      actionHandler: "pamphlet",
      details: [
        "Interactive Pamphlet & Prospectus Zoom Modal with direct PNG download",
        "Live Marquee Banner announcing new batches & special discount offers",
        "Embedded YouTube Video Lecture License section for home revision",
        "Dedicated Support & Complaint Portal at /support.html with Telegram alert integration",
      ],
    },

    // 4. Night Toggle
    {
      id: "faq-6",
      category: "night",
      categoryLabel: "Night Toggle & Theme",
      question: "Does the website support Night Mode / Dark Mode toggle for eye comfort?",
      answer:
        "Yes! The website is engineered with a default high-contrast dark twilight palette, and features a dedicated Night Mode Toggle that lets users switch between Slate Dark and Ultra Contrast Midnight Black for night-time reading and study.",
      badge: "Eye-Safe Palette",
      details: [
        "Default Slate Dark Mode: Deep navy slate canvas reducing screen glare and blue-light strain.",
        "Ultra Night Mode: Deep AMOLED black canvas maximizing contrast for late-night reading.",
        "High-contrast text passing WCAG AA accessibility standards.",
        "Smooth transitions across cards, modal dialogues, and navigation menus.",
      ],
    },

    // 5. Settings
    {
      id: "faq-7",
      category: "settings",
      categoryLabel: "Settings & Admin",
      question: "How does the Director Admin Control Panel work?",
      answer:
        "The academy director can log into the secure Admin Portal (/admin.html) using the director's secret passcode. The admin panel allows managing live database records, publishing promotional marquee offers, uploading gallery photos to ImgBB, and reviewing all student admission submissions.",
      badge: "Passcode Protected",
      details: [
        "Access via Navigation link or /admin.html route",
        "Passcode Security Gate: Ensures only authorized professors access student records",
        "Live Database Sync: Updates JSONBin storage in real-time without redeploying code",
        "Image Manager: Drag-and-drop photo uploader directly integrated with ImgBB cloud storage",
      ],
    },

    // 6. Code Section
    {
      id: "faq-8",
      category: "code",
      categoryLabel: "Code & Engine",
      question: "What technology stack powers the Smart Step Academy platform?",
      answer:
        "The platform is built on a full-stack Node.js Express + React TypeScript engine, featuring server-side REST API proxying, Gmail SMTP Nodemailer verification, ImgBB photo CDN integration, and real-time Telegram Bot webhook dispatching.",
      badge: "React + Express + Node",
      details: [
        "Backend: Express server on Node.js with bundling via Esbuild into CJS",
        "Frontend: React 18, TypeScript, Tailwind CSS, Lucide Icons, and Motion animations",
        "Email Engine: Gmail SMTP Nodemailer server sending HTML verification receipts",
        "Alert System: Instant Telegram Bot API webhooks delivering form alerts to director group",
        "Database: JSONBin persistent database API storing submissions, offers, and gallery items",
      ],
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleActionClick = (handler?: "enquiry" | "admission" | "pamphlet") => {
    if (handler === "enquiry") onOpenEnquiry();
    else if (handler === "admission") onOpenAdmission();
    else if (handler === "pamphlet") onOpenPamphlet();
  };

  return (
    <section id="faq" className={`py-16 px-4 sm:px-6 transition-colors duration-300 ${highContrastNight ? "bg-black text-slate-100" : "bg-slate-950 text-slate-100"}`}>
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Title Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>Smart Step Academy Knowledge Base</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Find immediate answers regarding physical structure, class timings, inquiry procedures, website features, night mode settings, and system architecture.
          </p>

          {/* Night Toggle Button Bar */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setHighContrastNight(!highContrastNight)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer shadow-md ${
                highContrastNight
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/20"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
              }`}
            >
              {highContrastNight ? (
                <>
                  <Sun className="w-4 h-4 text-slate-950" />
                  <span>Standard Slate Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-amber-400" />
                  <span>Night Mode (Ultra Dark)</span>
                </>
              )}
            </button>
            <span className="text-xs text-slate-500">
              {highContrastNight ? "Ultra OLED Black Mode Active" : "Slate Navy Dark Theme Active"}
            </span>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. timings, address, OTP, admin, code)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-11 pr-4 py-3 rounded-2xl text-xs text-white border focus:outline-none transition ${
              highContrastNight
                ? "bg-zinc-900 border-zinc-800 focus:border-amber-500"
                : "bg-slate-900 border-slate-800 focus:border-blue-500"
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  isActive
                    ? highContrastNight
                      ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                      : "bg-blue-600 text-white border-blue-500 font-bold shadow-md shadow-blue-600/20"
                    : highContrastNight
                    ? "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                    : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className={`p-8 text-center rounded-2xl border text-slate-400 text-xs ${highContrastNight ? "bg-zinc-900 border-zinc-800" : "bg-slate-900 border-slate-800"}`}>
              No questions matched your search query "{searchQuery}". Try searching for terms like "timings", "OTP", "admin", or "address".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    highContrastNight
                      ? isOpen
                        ? "bg-zinc-900 border-amber-500/50 shadow-lg"
                        : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                      : isOpen
                      ? "bg-slate-900 border-blue-500/50 shadow-xl"
                      : "bg-slate-900/60 border-slate-800/90 hover:border-slate-700"
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
                          {faq.categoryLabel}
                        </span>
                        {faq.badge && (
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                            {faq.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white pt-1">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`p-2 rounded-xl shrink-0 transition ${isOpen ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 space-y-4 text-xs text-slate-300 border-t border-slate-800/80 leading-relaxed">
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {faq.answer}
                      </p>

                      {faq.details && faq.details.length > 0 && (
                        <div className={`p-4 rounded-xl border space-y-2 ${highContrastNight ? "bg-black border-zinc-800" : "bg-slate-950 border-slate-800/80"}`}>
                          <div className="font-bold text-white flex items-center gap-1.5 text-xs text-blue-400">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" />
                            <span>Key Details & Specifications:</span>
                          </div>
                          <ul className="space-y-1.5 pl-2">
                            {faq.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-slate-300">
                                <span className="text-amber-400 font-bold">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {faq.actionText && (
                        <div className="pt-2">
                          <button
                            onClick={() => handleActionClick(faq.actionHandler)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>{faq.actionText}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Quick Contact Footer Banner inside FAQ */}
        <div className={`p-6 rounded-3xl border text-center space-y-3 ${highContrastNight ? "bg-zinc-900 border-zinc-800" : "bg-slate-900/80 border-slate-800"}`}>
          <h3 className="text-base font-bold text-white">Have a question not listed here?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Submit a quick online enquiry or call Prof. Shravan Sir & Prof. Bhole Sir directly at +91 94226 54321.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenEnquiry}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
            >
              Submit Quick Enquiry
            </button>
            <button
              onClick={onOpenAdmission}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
            >
              Start Admission Application
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
