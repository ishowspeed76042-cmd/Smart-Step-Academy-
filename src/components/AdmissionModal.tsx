import React, { useState } from "react";
import { AdmissionFormData } from "../types";
import { OtpModal } from "./OtpModal";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Clock,
  BookOpen,
  Camera,
  FileCheck,
  CheckCircle2,
  RefreshCw,
  Upload,
} from "lucide-react";

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<AdmissionFormData>({
    firstName: "",
    lastName: "",
    parentName: "",
    email: "",
    mobileNumber: "",
    address: "",
    selectedClass: "10th Standard (SSC Board)",
    selectedSubjects: ["English", "Mathematics", "Science"],
    preferredTime: "Evening 4:00 PM to 7:00 PM",
    photoBase64: "",
    photoUrl: "",
    aadharBase64: "",
    aadharUrl: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aadharPreview, setAadharPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData((prev) => {
      const exists = prev.selectedSubjects.includes(subject);
      const updated = exists
        ? prev.selectedSubjects.filter((s) => s !== subject)
        : [...prev.selectedSubjects, subject];
      return { ...prev, selectedSubjects: updated };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "photo" | "aadhar") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage("File size must be less than 8MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (field === "photo") {
        setPhotoPreview(result);
        setFormData((prev) => ({ ...prev, photoBase64: result }));
      } else {
        setAadharPreview(result);
        setFormData((prev) => ({ ...prev, aadharBase64: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.mobileNumber || !formData.selectedClass) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (formData.selectedSubjects.length === 0) {
      setErrorMessage("Please select at least one subject (English, Science, or Mathematics).");
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
    setPhotoPreview(null);
    setAadharPreview(null);
    setFormData({
      firstName: "",
      lastName: "",
      parentName: "",
      email: "",
      mobileNumber: "",
      address: "",
      selectedClass: "10th Standard (SSC Board)",
      selectedSubjects: ["English", "Mathematics", "Science"],
      preferredTime: "Evening 4:00 PM to 7:00 PM",
      photoBase64: "",
      photoUrl: "",
      aadharBase64: "",
      aadharUrl: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative my-8">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedResponse ? (
          /* Confirmation Success Screen */
          <div className="text-center space-y-6 py-4 animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white">Admission Form Submitted!</h3>
              <p className="text-sm text-blue-400 font-semibold">
                Official Verification Completed • Submission ID: {submittedResponse.submissionId}
              </p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 text-left text-sm text-slate-200 space-y-4 shadow-inner">
              <p className="font-bold text-amber-300 text-base">
                Welcome to Smart Step Academy, {formData.firstName}!
              </p>
              <p className="leading-relaxed">
                We have received your <strong>Admission Application</strong> for <strong>{formData.selectedClass}</strong>. A confirmation email has been dispatched to <strong>{formData.email}</strong>.
              </p>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="text-xs uppercase font-bold text-blue-400 tracking-wider">
                  Confirmed Class Schedule & Faculty:
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div>• <strong>4:00 PM - 5:00 PM:</strong> English (Prof. Shravan Sir)</div>
                  <div>• <strong>5:00 PM - 6:00 PM:</strong> Mathematics (Prof. Lakhsham Bhole Sir)</div>
                  <div>• <strong>6:00 PM - 7:00 PM:</strong> Science (Prof. Shravan Sir & Prof. Lakhsham Bhole Sir)</div>
                </div>
              </div>

              <p className="text-slate-300">
                Our faculty will contact you on <strong>{formData.mobileNumber}</strong> to complete batch allocation and textbook distribution.
              </p>

              <div className="pt-3 border-t border-slate-700 font-bold text-center text-blue-400 text-base">
                Thanks for choosing us — Smart Step Academy!
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 transition cursor-pointer"
            >
              Close & Return to Website
            </button>
          </div>
        ) : (
          /* Main Admission Form */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Session 2026-2027 Admission</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Student Admission Form
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Smart Step Academy • Latur (Back of Dhanvantari Clinic, Pin: 413512)
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-rose-200 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleInitialSubmit} className="space-y-4">
              {/* Student Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Student First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Student Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Parent Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    placeholder="Father / Mother Name"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    placeholder="10-Digit Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address * (For OTP Verification)
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Address in Latur
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g. Back of Dhanvantari Clinic, Latur"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Class Selection & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Select Class Standard *
                  </label>
                  <select
                    name="selectedClass"
                    value={formData.selectedClass}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-blue-500 focus:outline-none text-white"
                  >
                    <option value="10th Standard (SSC Board)">10th Standard (SSC Board)</option>
                    <option value="9th Standard">9th Standard</option>
                    <option value="8th Standard">8th Standard</option>
                    <option value="7th Standard">7th Standard</option>
                    <option value="Special Board Batch">Special Board Batch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span>Class Batch Timing</span>
                    <span className="text-[10px] text-amber-400 font-normal">Fixed Daily</span>
                  </label>
                  <div className="px-3 py-2.5 bg-slate-800/80 border border-amber-500/30 text-amber-300 rounded-xl text-sm font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Evening 4:00 PM to 7:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Subjects Checklist */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Select Enrolled Subjects (Class Schedule: 4:00 PM - 7:00 PM):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "English", label: "English", time: "4:00 - 5:00 PM", faculty: "Prof. Shravan Sir" },
                    { id: "Mathematics", label: "Mathematics", time: "5:00 - 6:00 PM", faculty: "Prof. Lakhsham Bhole Sir" },
                    { id: "Science", label: "Science", time: "6:00 - 7:00 PM", faculty: "Both Faculties" },
                  ].map((sub) => {
                    const isSelected = formData.selectedSubjects.includes(sub.id);
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => handleSubjectToggle(sub.id)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          isSelected
                            ? "bg-blue-600/30 border-blue-500 text-white shadow-md"
                            : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                        }`}
                      >
                        <div className="font-bold text-xs flex items-center justify-between">
                          <span>{sub.label}</span>
                          {isSelected && <BookOpen className="w-3.5 h-3.5 text-blue-400" />}
                        </div>
                        <div className="text-[11px] text-slate-300 font-medium mt-1">{sub.time}</div>
                        <div className="text-[10px] text-blue-300">{sub.faculty}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Document Photo Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Student Photo */}
                <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl">
                  <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-blue-400" />
                    <span>Upload Student Photo</span>
                  </label>
                  {photoPreview ? (
                    <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden border border-blue-500 shadow">
                      <img src={photoPreview} alt="Student Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoPreview(null);
                          setFormData((p) => ({ ...p, photoBase64: "" }));
                        }}
                        className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-0.5 text-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-800 transition">
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-[11px] text-slate-300 font-medium">Click to select photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "photo")}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Aadhar Card Photo */}
                <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl">
                  <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>Upload Aadhar Card Photo</span>
                  </label>
                  {aadharPreview ? (
                    <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden border border-emerald-500 shadow">
                      <img src={aadharPreview} alt="Aadhar Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setAadharPreview(null);
                          setFormData((p) => ({ ...p, aadharBase64: "" }));
                        }}
                        className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-0.5 text-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-600 hover:border-emerald-500 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-800 transition">
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-[11px] text-slate-300 font-medium">Click to select Aadhar photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "aadhar")}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing & Dispatching Email OTP...</span>
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-5 h-5" />
                    <span>Submit Admission & Send OTP Verification</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        <OtpModal
          isOpen={showOtpModal}
          email={formData.email}
          formType="Admission"
          formData={formData}
          onClose={() => setShowOtpModal(false)}
          onSuccess={handleOtpSuccess}
        />
      </div>
    </div>
  );
};
