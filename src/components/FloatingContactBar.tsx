import React, { useState } from "react";
import { MessageCircle, Phone, GraduationCap, X, Sparkles, ChevronUp } from "lucide-react";
import { ACADEMY_CONFIG } from "../data";

interface FloatingContactBarProps {
  onOpenEnquiry: () => void;
  onOpenAdmission: () => void;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({
  onOpenEnquiry,
  onOpenAdmission,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const cleanPhone = ACADEMY_CONFIG.phonePrimary.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hello%20Smart%20Step%20Academy%20Latur%2C%20I%20want%20to%20enquire%20about%208th%2F9th%2F10th%20Standard%20Admissions.`;

  return (
    <aside aria-label="Floating Contact Bar" className="fixed bottom-4 right-4 z-40 max-w-sm sm:max-w-md w-auto">
      {isExpanded ? (
        <div className="bg-slate-900/95 border-2 border-blue-500/50 rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-xl space-y-3 animate-fade-in text-white">
          <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-200">Admissions Desk Active</span>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Minimize Quick Desk"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-3 gap-2">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex flex-col items-center justify-center text-center shadow-lg transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-black uppercase">WhatsApp</span>
            </a>

            {/* Direct Call */}
            <a
              href={`tel:${cleanPhone}`}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex flex-col items-center justify-center text-center shadow-lg transition transform hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-black uppercase">Call Now</span>
            </a>

            {/* Apply */}
            <button
              onClick={onOpenAdmission}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black flex flex-col items-center justify-center text-center shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 mb-1" />
              <span className="text-[10px] uppercase">Apply</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-2xl shadow-blue-600/50 transition cursor-pointer border-2 border-blue-400"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Quick Help & Admissions</span>
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
    </aside>
  );
};
