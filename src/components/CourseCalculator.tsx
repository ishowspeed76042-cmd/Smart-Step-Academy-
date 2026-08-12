import React, { useState } from "react";
import {
  Calculator,
  Check,
  GraduationCap,
  Sparkles,
  Zap,
  Tag,
  Calendar,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface CourseCalculatorProps {
  onOpenAdmission: () => void;
}

export const CourseCalculator: React.FC<CourseCalculatorProps> = ({ onOpenAdmission }) => {
  const [selectedStandard, setSelectedStandard] = useState<"8th" | "9th" | "10th">("10th");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["English", "Mathematics", "Science"]);
  const [paymentPlan, setPaymentPlan] = useState<"annual" | "monthly">("annual");

  // Fee Structure Data (Latur standard competitive rates)
  const baseRates = {
    "8th": { singleSubject: 3500, fullCombo: 9500 },
    "9th": { singleSubject: 4200, fullCombo: 11500 },
    "10th": { singleSubject: 5000, fullCombo: 13800 },
  };

  const currentRates = baseRates[selectedStandard];

  // Calculate Fee
  const isFullCombo = selectedSubjects.length === 3;
  let rawFee = 0;

  if (isFullCombo) {
    rawFee = currentRates.fullCombo;
  } else {
    rawFee = selectedSubjects.length * currentRates.singleSubject;
  }

  // Early Bird Discount on Annual One-Time
  const discountPercent = paymentPlan === "annual" ? (isFullCombo ? 15 : 10) : 0;
  const discountAmount = Math.round((rawFee * discountPercent) / 100);
  const finalFee = rawFee - discountAmount;
  const monthlyInstallment = Math.round(finalFee / 8);

  const toggleSubject = (subj: string) => {
    if (selectedSubjects.includes(subj)) {
      if (selectedSubjects.length === 1) return; // Keep at least 1
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subj));
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  return (
    <section id="fee-calculator" className="py-20 bg-slate-900 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-blue-500/30 text-blue-300 text-xs font-bold shadow-md">
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span>Transparent Pricing & Business Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Interactive <span className="text-amber-400">Course & Fee Schedule</span> Estimator
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Select standard and subjects to estimate fees, early-bird discounts, and installment plans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {/* Step 1: Select Standard */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase text-slate-400 tracking-wider block">
                1. Select Academic Class / Standard
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "8th", name: "8th Standard", desc: "Foundation Batch" },
                  { id: "9th", name: "9th Standard", desc: "Pre-Board Mastery" },
                  { id: "10th", name: "10th Standard", desc: "SSC Board Special" },
                ].map((std) => {
                  const isSelected = selectedStandard === std.id;
                  return (
                    <button
                      key={std.id}
                      onClick={() => setSelectedStandard(std.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                        isSelected
                          ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="text-sm font-black">{std.name}</div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                        {std.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Subjects */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase text-slate-400 tracking-wider block">
                  2. Select Subjects
                </label>
                <button
                  onClick={() => setSelectedSubjects(["English", "Mathematics", "Science"])}
                  className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Select All (Best Value)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "English", teacher: "Prof. Shravan Sir", icon: "📚" },
                  { id: "Mathematics", teacher: "Prof. Bhole Sir", icon: "📐" },
                  { id: "Science", teacher: "Shravan & Bhole Sir", icon: "🔬" },
                ].map((subj) => {
                  const isChecked = selectedSubjects.includes(subj.id);
                  return (
                    <button
                      key={subj.id}
                      onClick={() => toggleSubject(subj.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-left transition cursor-pointer ${
                        isChecked
                          ? "bg-slate-800 border-amber-400 text-white shadow-md"
                          : "bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold flex items-center gap-1.5">
                          <span>{subj.icon}</span>
                          <span>{subj.id}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{subj.teacher}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isChecked ? "bg-amber-400 border-amber-400 text-slate-950" : "border-slate-700"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Payment Plan */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-extrabold uppercase text-slate-400 tracking-wider block">
                3. Choose Payment Plan
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentPlan("annual")}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                    paymentPlan === "annual"
                      ? "bg-slate-800 border-emerald-500 text-white shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-white">Full Annual Lump Sum</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 font-black px-2 py-0.5 rounded border border-emerald-800">
                      Save {isFullCombo ? "15%" : "10%"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">One-time payment with maximum early bird discount</p>
                </button>

                <button
                  onClick={() => setPaymentPlan("monthly")}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                    paymentPlan === "monthly"
                      ? "bg-slate-800 border-indigo-500 text-white shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-white">Monthly Installments</span>
                    <span className="text-[10px] bg-indigo-950 text-indigo-300 font-bold px-2 py-0.5 rounded border border-indigo-800">
                      8 Installments
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Pay month-by-month over the academic term</p>
                </button>
              </div>
            </div>
          </div>

          {/* Breakdown Card Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-bl-xl shadow-md flex items-center gap-1">
              <Zap className="w-3 h-3 fill-slate-950" /> Early Bird Offer
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Estimated Course Investment
              </span>
              <h3 className="text-2xl font-black text-white">
                {selectedStandard} Standard ({selectedSubjects.join(", ")})
              </h3>
            </div>

            {/* Price Display */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400 font-medium">Standard Total Fee:</span>
                <span className="text-sm text-slate-400 line-through font-mono">₹{rawFee.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-baseline justify-between text-emerald-400">
                  <span className="text-xs font-bold flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Special Early Discount ({discountPercent}% Off):
                  </span>
                  <span className="text-sm font-bold font-mono">- ₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
                <span className="text-sm font-bold text-white">Total Payable Fee:</span>
                <div className="text-right">
                  <span className="text-3xl font-black text-amber-400 font-mono">
                    ₹{finalFee.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-normal">Academic Year 2026</span>
                </div>
              </div>

              {paymentPlan === "monthly" && (
                <div className="mt-3 p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-800/60 text-xs text-indigo-200 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Approx. Monthly Payment:
                  </span>
                  <span className="font-extrabold font-mono text-white">
                    ₹{monthlyInstallment.toLocaleString("en-IN")} / mo (8 mos)
                  </span>
                </div>
              )}
            </div>

            {/* Included Deliverables Checklist */}
            <div className="space-y-2 text-xs text-slate-300">
              <span className="font-bold text-slate-200 uppercase tracking-wider block">
                Package Includes Everything Required:
              </span>
              <ul className="space-y-1.5">
                {[
                  "Complete 3-Period Evening Classroom Sessions",
                  "Printed Chapter Worksheets & Daily Practice Problems",
                  "Sunday Board Mock Test Series with Paper Analysis",
                  "Weekly WhatsApp Progress Dashboard for Parents",
                  "1-on-1 Daily Remedial Doubt Clearing Access",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button
              onClick={onOpenAdmission}
              id="btn-calculator-admission"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Lock Seat With This Fee Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>No Hidden Fees • Official Receipt Provided Upon Enrollment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
