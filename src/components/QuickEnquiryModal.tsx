import React, { useState } from "react";
import { QuickEnquiryData } from "../types";
import { OtpModal } from "./OtpModal";
import { X, User, Mail, Phone, MapPin, HelpCircle, Send, CheckCircle2, RefreshCw } from "lucide-react";

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickEnquiryModal: React.FC<QuickEnquiryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<QuickEnquiryData>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    question: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpToken, setOtpToken] = useState<string | undefined>(undefined);
  const [initialDebugOtp, setInitialDebugOtp] = useState<string | undefined>(undefined);
  const [submittedResponse, setSubmittedResponse] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.mobileNumber || !formData.question) {
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
        setOtpToken(data.otpToken);
        setInitialDebugOtp(data.debugOtp);
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
      address: "",
      question: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative my-8">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedResponse ? (
          /* Confirmation Success Screen */
          <div className="text-center space-y-5 py-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Form Submitted Successfully!</h3>
              <p className="text-sm text-blue-400 font-semibold">
                Verification Complete • Ref ID: {submittedResponse.submissionId}
              </p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 text-left text-sm text-slate-200 space-y-3 leading-relaxed shadow-inner">
              <p className="font-semibold text-amber-300">
                Dear {formData.firstName} {formData.lastName},
              </p>
              <p>
                We have received your <strong>Quick Enquiry</strong> submission. A confirmation email has been sent to <strong>{formData.email}</strong>.
              </p>
              <p className="text-slate-300">
                Our agents and faculty will call you shortly on your mobile number <strong>{formData.mobileNumber}</strong> to answer all your questions.
              </p>
              <div className="pt-3 border-t border-slate-700 font-bold text-blue-400 text-center">
                Thanks for choosing us — Smart Step Academy!
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        ) : (
          /* Initial Enquiry Form */
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Send className="w-6 h-6 text-blue-500" />
                Quick Enquiry Form
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Have questions about admissions, fees, or subjects? Send your inquiry below.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-rose-200 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleInitialSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="e.g. Rahul"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="e.g. Sharma"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      name="mobileNumber"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Address (Latur Area)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g. Near Dhanvantari Clinic, Latur"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Question / Query *
                </label>
                <div className="relative">
                  <HelpCircle className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    name="question"
                    required
                    rows={3}
                    placeholder="Ask about batch timings, fee structure, English/Maths/Science curriculum..."
                    value={formData.question}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Sending OTP Verification Email...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Proceed to Verify Email OTP & Submit</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        <OtpModal
          isOpen={showOtpModal}
          email={formData.email}
          formType="Enquiry"
          formData={formData}
          otpToken={otpToken}
          initialDebugOtp={initialDebugOtp}
          onClose={() => setShowOtpModal(false)}
          onSuccess={handleOtpSuccess}
        />
      </div>
    </div>
  );
};
