import React from "react";
import { ACADEMY_CONFIG } from "../data";
import { X, Download, ExternalLink, Sparkles, Eye } from "lucide-react";

interface PamphletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PamphletModal: React.FC<PamphletModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-4 sm:p-6 text-white shadow-2xl relative my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Official Academy Pamphlet & Prospectus</h3>
              <p className="text-xs text-slate-400">Smart Step Academy • Latur (413512)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pamphlet Image Display */}
        <div className="my-4 overflow-y-auto flex-1 flex justify-center bg-slate-950 rounded-xl p-2 border border-slate-800 shadow-inner">
          <img
            src={ACADEMY_CONFIG.pamphletUrl}
            alt="Smart Step Academy Official Pamphlet"
            className="max-w-full h-auto object-contain rounded-lg shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-blue-400" />
            <span>High Resolution Prospectus • Prof. Shravan Sir & Prof. Sham Bhole Sir</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={ACADEMY_CONFIG.pamphletUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Image Direct</span>
            </a>

            <a
              href={ACADEMY_CONFIG.pamphletUrl}
              download="Smart_Step_Academy_Brochure.jpg"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Pamphlet</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
