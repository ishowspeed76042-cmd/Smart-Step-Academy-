import React from "react";
import {
  Users,
  MessageSquare,
  FileCheck2,
  HelpCircle,
  BrainCircuit,
  Repeat,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface BusinessFeaturesSectionProps {
  onOpenEnquiry: () => void;
  onOpenAdmission: () => void;
}

export const BusinessFeaturesSection: React.FC<BusinessFeaturesSectionProps> = ({
  onOpenEnquiry,
  onOpenAdmission,
}) => {
  const pillars = [
    {
      id: "p1",
      title: "Strict 25-Student Batch Cap",
      icon: Users,
      badge: "Quality Guarantee",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      description:
        "Unlike overcrowded coaching classes with 100+ students, Smart Step Academy caps every single batch at 25 students. This ensures Prof. Shravan Sir & Prof. Bhole Sir monitor every child's notebook and individual comprehension.",
    },
    {
      id: "p2",
      title: "Weekly Parent WhatsApp Reports",
      icon: MessageSquare,
      badge: "Parent Portal",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      description:
        "Complete transparency. Every Sunday after the weekly Sunday Test, parents receive detailed attendance and mark breakdown via WhatsApp, keeping you 100% updated on your child's academic growth.",
    },
    {
      id: "p3",
      title: "Daily Practice Problems (DPP)",
      icon: FileCheck2,
      badge: "Exam Mastery",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      description:
        "Every 1-hour session is backed by a 5-question Daily Practice Worksheet for English, Mathematics, and Science to lock in conceptual retention before the next day's class.",
    },
    {
      id: "p4",
      title: "30-Min Daily Remedial Doubt Hours",
      icon: HelpCircle,
      badge: "Personal Care",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      description:
        "No question goes unanswered. Dedicated 30-minute buffer slots before and after regular evening batches ensure shy or struggling students get one-on-one doubt resolution.",
    },
    {
      id: "p5",
      title: "Conceptual & Scientific Method",
      icon: BrainCircuit,
      badge: "Deep Understanding",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      description:
        "We replace rote memorization with visual diagrams, step-by-step formula derivations, and English grammar logic designed specifically for high SSC Board scoring.",
    },
    {
      id: "p6",
      title: "3 Full Syllabus Revision Cycles",
      icon: Repeat,
      badge: "Board Exam Ready",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      description:
        "Syllabus completion is target-scheduled 2 months before final board exams. The remaining time is dedicated to 3 full-length preliminary mock test cycles under real exam conditions.",
    },
  ];

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>5-Star Business Excellence Model</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Why <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Smart Step Academy</span> is Latur's Premier Choice
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Built on a proven 6-pillar academic structure designed to turn average marks into board toppers with disciplined personal guidance.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800/90 hover:border-blue-500/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-amber-400 shadow-md group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-blue-300 transition">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Standard Operating Procedure
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout Bar */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-900/60 border border-blue-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-black text-white">
              Ready to Experience the 5-Star Difference?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Limited seats available for 8th, 9th & 10th Standard Evening Batches.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAdmission}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-lg shadow-blue-600/30 transition flex items-center gap-2 cursor-pointer"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenEnquiry}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition cursor-pointer"
            >
              Request Free Demo Class
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
