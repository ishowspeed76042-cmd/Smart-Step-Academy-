import React from "react";
import { ACADEMY_CONFIG } from "../data";
import { GraduationCap, UserCheck, FileText, MapPin, Clock, Star, Sparkles, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  onOpenEnquiry: () => void;
  onOpenAdmission: () => void;
  onOpenPamphlet: () => void;
  onSecretTap?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEnquiry,
  onOpenAdmission,
  onOpenPamphlet,
  onSecretTap,
}) => {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 overflow-hidden bg-slate-950">
      {/* Background Banner Image with Glass Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={ACADEMY_CONFIG.bannerUrl}
          alt="Smart Step Academy Banner"
          className="w-full h-full object-cover object-center opacity-35 scale-105 filter blur-[1px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/80 to-slate-950"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
        {/* Academy Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-blue-500/40 text-blue-300 text-xs sm:text-sm font-bold shadow-xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>Latur's Premier Coaching Institute • SSC Board Experts</span>
          <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-black">
            Admissions Open
          </span>
        </div>

        {/* Main Brand & Headline */}
        <div className="space-y-4">
          <div className="flex justify-center mb-2">
            <button
              onClick={() => {
                if (onSecretTap) onSecretTap();
              }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-blue-500 shadow-2xl shadow-blue-500/30 cursor-pointer hover:scale-105 transition focus:outline-none"
              title="Tap logo 5 times to open Admin Portal"
            >
              <img
                src={ACADEMY_CONFIG.logoUrl}
                alt="Smart Step Academy Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight">
            SMART STEP <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent">ACADEMY</span>
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-amber-400 max-w-3xl mx-auto leading-snug">
            Guided by <span className="text-white underline decoration-blue-500">Prof. Shravan Sir</span> & <span className="text-white underline decoration-blue-500">Prof. Bhole Sir</span>
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Specialized Evening Coaching for 8th, 9th & 10th Standard Students in <strong>English, Mathematics, and Science</strong>. Building strong conceptual clarity and top board rankings.
          </p>
        </div>

        {/* Key Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-2">
          <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-4 text-left shadow-lg">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
              <Clock className="w-4 h-4" />
              <span>Evening Batch Timing</span>
            </div>
            <p className="text-white font-extrabold text-base">4:00 PM to 7:00 PM</p>
            <p className="text-xs text-slate-400 mt-1">Daily structured 3-period system</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-4 text-left shadow-lg">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Expert Core Subjects</span>
            </div>
            <p className="text-white font-extrabold text-base">English • Science • Maths</p>
            <p className="text-xs text-slate-400 mt-1">Complete textbook derivation & practice</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-4 text-left shadow-lg">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
              <MapPin className="w-4 h-4" />
              <span>Latur Location</span>
            </div>
            <p className="text-white font-extrabold text-base">Back of Dhanvantari Clinic</p>
            <p className="text-xs text-slate-400 mt-1">Pin Code: 413512, Latur</p>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenAdmission}
            id="btn-hero-admission"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-base shadow-2xl shadow-blue-600/40 transition transform hover:-translate-y-1 cursor-pointer"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Apply For Admission Now</span>
          </button>

          <button
            onClick={onOpenEnquiry}
            id="btn-hero-enquiry"
            className="flex items-center gap-2 px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-bold text-base border border-slate-700 transition shadow-lg cursor-pointer"
          >
            <UserCheck className="w-5 h-5 text-blue-400" />
            <span>Quick Enquiry</span>
          </button>

          <button
            onClick={onOpenPamphlet}
            id="btn-hero-brochure"
            className="flex items-center gap-2 px-6 py-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-base border border-amber-500/40 transition shadow-lg cursor-pointer"
          >
            <FileText className="w-5 h-5 text-amber-400" />
            <span>Official Pamphlet</span>
          </button>
        </div>

        {/* Verification guarantee badge */}
        <div className="pt-4 text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Instant Email OTP Verification Enabled for Real Submissions</span>
        </div>
      </div>
    </section>
  );
};
