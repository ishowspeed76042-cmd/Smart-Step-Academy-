import React from "react";
import { Users, Award, ShieldCheck, Star, Sparkles, CheckCircle2 } from "lucide-react";

export const TrustStatsBar: React.FC = () => {
  const stats = [
    {
      id: "s1",
      icon: Users,
      value: "1,200+",
      label: "Students Mentored",
      subtext: "Across Latur District",
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: "s2",
      icon: Award,
      value: "98.6%",
      label: "SSC Board Pass Rate",
      subtext: "Consistently Top Marks",
      color: "from-amber-400 to-yellow-500",
    },
    {
      id: "s3",
      icon: ShieldCheck,
      value: "12+ Years",
      label: "Teaching Excellence",
      subtext: "Prof. Shravan & Bhole Sir",
      color: "from-indigo-400 to-purple-500",
    },
    {
      id: "s4",
      icon: Star,
      value: "4.9 / 5.0",
      label: "Parent Satisfaction",
      subtext: "180+ Verified Reviews",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <section className="relative z-20 -mt-8 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`flex flex-col items-center text-center p-3 ${
                idx > 0 ? "pt-4 sm:pt-3" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-xl bg-slate-800 border border-slate-700/80 text-amber-400 shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                {stat.label}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                {stat.subtext}
              </p>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Pill */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 bg-slate-900/60 border border-slate-800/60 py-2 px-4 rounded-full backdrop-blur-sm max-w-3xl mx-auto">
        <span className="flex items-center gap-1 text-emerald-400 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" /> Max 25 Students/Batch
        </span>
        <span className="text-slate-600">•</span>
        <span className="flex items-center gap-1 text-blue-400 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" /> Weekly WhatsApp Progress Reports
        </span>
        <span className="text-slate-600">•</span>
        <span className="flex items-center gap-1 text-amber-400 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" /> Personal Remedial Classes
        </span>
      </div>
    </section>
  );
};
