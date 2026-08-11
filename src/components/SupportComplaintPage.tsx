import React, { useState } from "react";
import { SupportComplaintData } from "../types";
import { OtpModal } from "./OtpModal";
import { ShieldAlert, Send, User, Mail, Phone, AlertTriangle, CheckCircle2, RefreshCw, FileText } from "lucide-react";

export const SupportComplaintPage: React.FC = () => {
  const [formData, setFormData] = useState<SupportComplaintData>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    reportTarget: "Student",
    targetName: "",
    complaintDetails: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.mobileNumber || !formData.complaintDetails) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, name: formData.firstName }),
      });

      const data = await res.json();
      if (data.success) {
        setShowOtpModal(true);
      } else {
        setErrorMessage(data.message || "Failed to send verification OTP");
      }
    } catch (err) {
      setErrorMessage("Network error sending OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSuccess = (response: any) => {
    setShowOtpModal(false);
    setSubmittedResponse(response);
  };

  const handleReset = () => {
    setSubmittedResponse(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      reportTarget: "Student",
      targetName: "",
      complaintDetails: "",
    });
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-white">
        {/* Top Header */}
        <div className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Confidential Report & Student Support Portal (support.html)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Submit A Confidential Report / Complaint
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Students or parents can report any grievance, disciplinary concern, or complaint regarding another student, teacher, or academy facilities. Every report is treated with strict confidentiality and verified via Email OTP.
          </p>
        </div>

        {submittedResponse ? (
          <div className="text-center space-y-6 py-6 animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Report Submitted & Verified!</h3>
              <p className="text-xs text-blue-400 font-semibold">
                Report Ref: {submittedResponse.submissionId}
              </p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 text-left text-sm text-slate-200 space-y-3 shadow-inner">
              <p className="font-bold text-amber-300">
                Dear {formData.firstName},
              </p>
              <p>
                Your complaint regarding <strong>{formData.reportTarget} {formData.targetName ? `(${formData.targetName})` : ""}</strong> has been officially logged and dispatched directly to the directorate of Smart Step Academy.
              </p>
              <p className="text-slate-300 text-xs">
                A confirmation has been sent to <strong>{formData.email}</strong>. Our faculty team will review the concern and take necessary administrative action.
              </p>
              <div className="pt-3 border-t border-slate-700 font-bold text-center text-blue-400">
                Thanks for helping us maintain a safe, respectful learning environment — Smart Step Academy!
              </div>
            </div>

            <button
              onClick={handleReset}
              className="py-3 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition cursor-pointer"
            >
              Submit Another Report
            </button>
          </div>
        ) : (
          <form onSubmit={handleInitialSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-rose-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Target selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Report Category / Target *
                </label>
                <select
                  name="reportTarget"
                  value={formData.reportTarget}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none text-white"
                >
                  <option value="Student">Complaint Against Another Student</option>
                  <option value="Teacher">Complaint Regarding A Teacher / Faculty</option>
                  <option value="Facility">Classroom / Facility Issue</option>
                  <option value="Other">Other Disciplinary / Support Matter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Name of Student or Teacher (Optional)
                </label>
                <input
                  type="text"
                  name="targetName"
                  placeholder="e.g. Student name or Professor name"
                  value={formData.targetName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Detailed Complaint */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Complaint / Incident Details *
              </label>
              <textarea
                name="complaintDetails"
                required
                rows={4}
                placeholder="Describe what happened, dates, classroom location, or specific grievance in detail..."
                value={formData.complaintDetails}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Reporter Information */}
            <div className="pt-3 border-t border-slate-800">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                Reporter Verification Info (Confidential)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Your Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Your Surname"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    placeholder="10-digit phone number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Email Address * (For OTP Verification)
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold text-sm shadow-xl shadow-rose-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending Verification Email OTP...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Verify Email OTP & Submit Confidential Complaint</span>
                </>
              )}
            </button>
          </form>
        )}

        <OtpModal
          isOpen={showOtpModal}
          email={formData.email}
          formType="Support/Complaint"
          formData={formData}
          onClose={() => setShowOtpModal(false)}
          onSuccess={handleOtpSuccess}
        />
      </div>
    </div>
  );
};
