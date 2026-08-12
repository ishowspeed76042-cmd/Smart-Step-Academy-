import React from "react";
import { FACULTIES } from "../data";
import { Award, BookOpen, Star, Sparkles, MessageCircle, CheckCircle2, UserCheck } from "lucide-react";

interface FacultySectionProps {
  onOpenEnquiry: () => void;
  onSecretTap?: () => void;
}

export const FacultySection: React.FC<FacultySectionProps> = ({ onOpenEnquiry, onSecretTap }) => {
  return (
    <section id="teachers" className="py-16 bg-slate-900 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Core Faculty Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Learn From Latur's Most Trusted <span className="text-amber-400">Professors</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Our founding directors and professors deliver personalized instruction, exam strategies, and continuous motivation to ensure every student achieves board excellence.
          </p>
        </div>

        {/* Professors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {FACULTIES.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl hover:border-blue-500/50 transition group flex flex-col justify-between"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 text-center sm:text-left">
                  <div
                    onClick={() => {
                      if (onSecretTap) onSecretTap();
                    }}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl shrink-0 bg-slate-900 flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:scale-105 transition"
                    title="Tap photo 5 times to open Admin Portal"
                  >
                    {teacher.avatar ? (
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 space-y-1">
                        <UserCheck className="w-8 h-8 text-amber-400" />
                        <span className="text-[9px] font-bold text-amber-300 uppercase tracking-tight">Photo Coming Soon</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{teacher.experience}</span>
                    </div>

                    <h3 className="text-2xl font-black text-white">{teacher.name}</h3>
                    <p className="text-xs text-blue-400 font-bold">{teacher.title}</p>

                    <div className="flex flex-wrap gap-1.5 pt-2 justify-center sm:justify-start">
                      {teacher.subjects.map((sub, i) => (
                        <span
                          key={i}
                          className="bg-slate-900 border border-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-md font-semibold"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed mb-6">
                  <div className="flex items-center gap-1 text-amber-400 mb-1 font-bold">
                    <MessageCircle className="w-4 h-4" />
                    <span>Teaching Philosophy:</span>
                  </div>
                  {teacher.bio}
                </div>

                <div className="space-y-2 mb-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Personalized 1-on-1 doubt resolution after class hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Comprehensive handwritten notes & formula workbooks</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenEnquiry}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-200 hover:text-white font-bold text-xs border border-slate-800 hover:border-blue-500 transition shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Ask {teacher.name.split(" ")[1]} Sir A Question</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
