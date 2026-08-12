import React, { useState } from "react";
import { Star, Quote, Award, CheckCircle2, ThumbsUp, Sparkles } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<"all" | "toppers" | "parents">("all");

  const testimonials = [
    {
      id: "t1",
      category: "toppers",
      name: "Aditya Deshmukh",
      subhead: "10th SSC Board — 97.2%",
      subjectScore: "Maths: 99/100 | Science: 98/100",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
      quote:
        "Prof. Bhole Sir made geometry and algebra formulas so intuitive that I never had to memorize steps blindly. Prof. Shravan Sir's science diagram practice made my board answer sheet look crystal clear!",
      rating: 5,
      year: "SSC 2025 Board Batch",
    },
    {
      id: "t2",
      category: "parents",
      name: "Mr. Rajeshwar Patil",
      subhead: "Parent of Sanika Patil (9th Std)",
      subjectScore: "Weekly WhatsApp Tracking Verified",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote:
        "As a parent, what I appreciate most is the weekly Sunday test report sent directly to my phone. Smart Step Academy doesn't just teach — they take complete responsibility for the student's daily discipline.",
      rating: 5,
      year: "Parent Review",
    },
    {
      id: "t3",
      category: "toppers",
      name: "Ananya Kulkarni",
      subhead: "10th SSC Board — 96.4%",
      subjectScore: "English: 96/100 | Science: 97/100",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote:
        "I was very weak in English grammar and essay writing before joining Smart Step Academy. Shravan Sir's personal feedback on my weekly answer papers helped me score 96/100 in board English!",
      rating: 5,
      year: "SSC 2025 Board Batch",
    },
    {
      id: "t4",
      category: "parents",
      name: "Mrs. Vandana Shinde",
      subhead: "Parent of Omkar Shinde (10th Std)",
      subjectScore: "1:1 Remedial Doubt Classes",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      quote:
        "The small batch size of 25 students is the biggest advantage. Omkar never felt lost in a big crowd. Whenever he had doubts in Physics or Algebra, Bhole Sir personally stayed back after class.",
      rating: 5,
      year: "Parent Review",
    },
  ];

  const filtered = testimonials.filter((item) => {
    if (filterCategory === "all") return true;
    return item.category === filterCategory;
  });

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-md">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>5-Star Rated Coaching Institute</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Loved by <span className="text-blue-400">Board Toppers</span> & <span className="text-amber-400">Parents</span> Across Latur
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Real feedback from students and parents who experienced the Smart Step transformation.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-10">
          {[
            { id: "all", label: "All Reviews (4.9 ★)" },
            { id: "toppers", label: "Board Toppers & Achievers" },
            { id: "parents", label: "Parent Testimonials" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                filterCategory === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between relative group hover:border-blue-500/50 transition"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-base font-extrabold text-white">{item.name}</h4>
                      <p className="text-xs text-amber-300 font-medium">{item.subhead}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="inline-block px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-mono text-blue-300 font-bold border border-slate-700">
                  🏆 {item.subjectScore}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed pt-1">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Review
                </span>
                <span>{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
