import React from "react";
import { SCHEDULE } from "../data";
import { Clock, BookOpen, Calculator, Atom, CheckCircle, ArrowRight } from "lucide-react";

interface ScheduleSectionProps {
  onOpenAdmission: () => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onOpenAdmission }) => {
  const getIcon = (subject: string) => {
    switch (subject.toLowerCase()) {
      case "english":
        return <BookOpen className="w-6 h-6 text-blue-400" />;
      case "mathematics":
        return <Calculator className="w-6 h-6 text-amber-400" />;
      case "science":
        return <Atom className="w-6 h-6 text-emerald-400" />;
      default:
        return <Clock className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <section id="schedule" className="py-16 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Daily Class Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Evening Batch Timings: <span className="text-blue-500">4:00 PM to 7:00 PM</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Every evening, our students undergo three intensive 1-hour subject periods designed for maximum comprehension, doubt clearance, and problem solving.
          </p>
        </div>

        {/* 3 Periods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCHEDULE.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl hover:border-slate-700 transition group"
            >
              <div className="absolute top-0 right-0 bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-bl-xl border-l border-b border-slate-700">
                Period #{index + 1}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 group-hover:scale-105 transition">
                  {getIcon(item.subject)}
                </div>
                <div>
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>
                  <h3 className="text-xl font-black text-white">{item.subject}</h3>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs font-bold text-blue-300 bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-800/50 inline-block">
                  Faculty: {item.faculty}
                </span>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed mb-6">
                {item.description}
              </p>

              <button
                onClick={onOpenAdmission}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border border-slate-700 hover:border-blue-500"
              >
                <span>Enroll for {item.subject}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Schedule Footer Note */}
        <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Regular Sunday chapter-wise practice tests and personalized progress reports for parents.</span>
          </div>

          <button
            onClick={onOpenAdmission}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition cursor-pointer shrink-0"
          >
            Apply Admission Now
          </button>
        </div>
      </div>
    </section>
  );
};
