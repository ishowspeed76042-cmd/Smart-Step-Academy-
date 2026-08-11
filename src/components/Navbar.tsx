import React, { useState } from "react";
import { ACADEMY_CONFIG } from "../data";
import {
  Phone,
  GraduationCap,
  FileText,
  UserCheck,
  ShieldAlert,
  Settings,
  Menu,
  X,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface NavbarProps {
  onOpenEnquiry: () => void;
  onOpenAdmission: () => void;
  onOpenPamphlet: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnquiry,
  onOpenAdmission,
  onOpenPamphlet,
  activeTab,
  setActiveTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "schedule", label: "Timings & Schedule" },
    { id: "teachers", label: "Professors" },
    { id: "gallery", label: "Gallery & Videos" },
    { id: "location", label: "Location" },
    { id: "support", label: "Report / Support", isSupport: true },
    { id: "admin", label: "Admin Portal", isAdmin: true },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    if (id !== "support" && id !== "admin") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Address & Phone Bar */}
      <div className="bg-slate-950 text-slate-400 text-xs py-1.5 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Latur, Back of Dhanvantari Clinic (413512)
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-amber-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Evening Classes: 4:00 PM to 7:00 PM
            </span>
            <span className="hidden lg:inline text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-600/60 rounded-full font-bold text-[11px] shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Email Templates Verified ✓</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${ACADEMY_CONFIG.phonePrimary}`}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{ACADEMY_CONFIG.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          id="btn-brand-logo"
        >
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-blue-500/50 shadow-md group-hover:border-blue-400 transition">
            <img
              src={ACADEMY_CONFIG.logoUrl}
              alt="Smart Step Academy Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5">
              Smart Step <span className="text-blue-500">Academy</span>
            </span>
            <p className="text-xs text-blue-300 font-medium tracking-wide">
              Prof. Shravan Sir & Prof. Lakhsham Bhole Sir
            </p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                id={`nav-link-${link.id}`}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-md"
                    : link.isSupport
                    ? "text-rose-400 hover:bg-rose-950/50 hover:text-rose-300"
                    : link.isAdmin
                    ? "text-amber-400 hover:bg-amber-950/50 hover:text-amber-300"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={onOpenPamphlet}
            id="btn-nav-pamphlet"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition shadow-sm cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Brochure / Pamphlet</span>
          </button>

          <button
            onClick={onOpenEnquiry}
            id="btn-nav-enquiry"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-xs font-bold border border-blue-700 transition shadow-sm cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-blue-400" />
            <span>Quick Enquiry</span>
          </button>

          <button
            onClick={onOpenAdmission}
            id="btn-nav-admission"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Admission Form</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={onOpenAdmission}
            id="btn-mobile-quick-admission"
            className="sm:hidden px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold cursor-pointer"
          >
            Admission
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="btn-mobile-menu-toggle"
            className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white border border-slate-700 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3 shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeTab === link.id
                    ? "bg-blue-600 text-white font-bold"
                    : link.isSupport
                    ? "bg-rose-950/40 text-rose-300 border border-rose-900/50"
                    : link.isAdmin
                    ? "bg-amber-950/40 text-amber-300 border border-amber-900/50"
                    : "bg-slate-800/80 text-slate-200 hover:bg-slate-800"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                onOpenPamphlet();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-700 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>View Official Pamphlet</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenEnquiry();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-blue-900/80 text-blue-200 text-xs font-bold border border-blue-700 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Quick Enquiry</span>
              </button>

              <button
                onClick={() => {
                  onOpenAdmission();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-bold cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Admission Form</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
