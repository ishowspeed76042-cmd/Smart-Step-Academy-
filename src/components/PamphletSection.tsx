import React from "react";
import { ACADEMY_CONFIG } from "../data";
import { FileText, Download, ZoomIn, CheckCircle2, Sparkles } from "lucide-react";

interface PamphletSectionProps {
  onOpenPamphlet: () => void;
  onOpenAdmission: () => void;
}

export const PamphletSection: React.FC<PamphletSectionProps> = ({
  onOpenPamphlet,
  onOpenAdmission,
}) => {
  return (
    <section id="pamphlet" className="py-16 bg-slate-900 border-t border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Official Academy Prospectus</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Explore Our Smart Step Academy <span className="text-amber-400">Official Pamphlet</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Check out our complete academic brochure outlining batch offerings, teaching methodology, specialized test series, and professor profiles for English, Mathematics, and Science.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200 font-medium">
              {[
                "Evening Batches: 4:00 PM - 7:00 PM",
                "English: 4:00 PM - 5:00 PM",
                "Mathematics: 5:00 PM - 6:00 PM",
                "Science: 6:00 PM - 7:00 PM",
                "Prof. Shravan Sir & Prof. Lakhsham Bhole Sir",
                "Location: Back of Dhanvantari Clinic, Latur",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenPamphlet}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Zoom & View Full Pamphlet</span>
              </button>

              <button
                onClick={onOpenAdmission}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Apply for Admission</span>
              </button>
            </div>
          </div>

          {/* Right Image Preview Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={onOpenPamphlet}
              className="group relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-slate-950 max-w-sm cursor-pointer transform transition hover:scale-[1.02]"
            >
              <img
                src={ACADEMY_CONFIG.pamphletUrl}
                alt="Smart Step Academy Brochure Pamphlet"
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-amber-500 text-slate-950 px-4 py-2 rounded-xl font-bold text-xs shadow-lg flex items-center gap-2">
                  <ZoomIn className="w-4 h-4" />
                  <span>Click to Expand Pamphlet</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
