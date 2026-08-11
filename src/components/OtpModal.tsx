import React, { useState, useEffect } from "react";
import { Mail, CheckCircle, ShieldCheck, RefreshCw, AlertCircle, X, KeyRound } from "lucide-react";

interface OtpModalProps {
  isOpen: boolean;
  email: string;
  formType: "Enquiry" | "Admission" | "Support/Complaint";
  formData: any;
  onClose: () => void;
  onSuccess: (response: any) => void;
}

export const OtpModal: React.FC<OtpModalProps> = ({
  isOpen,
  email,
  formType,
  formData,
  onClose,
  onSuccess,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setOtp(Array(6).fill(""));
      setErrorMessage("");
      setTimer(60);
      setCanResend(false);
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Handle paste
      const pastedDigits = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedDigits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextInput = document.getElementById(`otp-input-5`);
      if (nextInput) nextInput.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setCanResend(false);
    setTimer(60);
    setResendStatus("Sending new OTP...");
    setErrorMessage("");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: formData.firstName }),
      });
      const data = await res.json();
      if (data.success) {
        setResendStatus("New OTP sent to " + email);
      } else {
        setErrorMessage(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setErrorMessage("Network error while resending OTP");
    }
  };

  const handleVerifySubmission = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      setErrorMessage("Please enter complete 6-digit OTP code");
      return;
    }

    setIsVerifying(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: fullOtp,
          formType,
          formData,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onSuccess(data);
      } else {
        setErrorMessage(data.message || "Verification failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Failed to verify OTP. Please check your internet connection.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-white">Email Verification Required</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            To confirm you are a real applicant, a 6-digit verification code has been sent to:
            <br />
            <strong className="text-blue-400 underline decoration-blue-500/50">{email}</strong>
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-950/80 border border-rose-800/80 rounded-xl flex items-start gap-2 text-rose-200 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {resendStatus && (
          <div className="mb-4 p-2.5 bg-emerald-950/80 border border-emerald-800/80 rounded-xl flex items-center gap-2 text-emerald-200 text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{resendStatus}</span>
          </div>
        )}

        {/* 6 Digit Input Grid */}
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-11 h-12 text-center text-xl font-black bg-slate-800 border border-slate-700 rounded-xl focus:border-blue-500 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white transition shadow-inner"
            />
          ))}
        </div>

        <button
          onClick={handleVerifySubmission}
          disabled={isVerifying || otp.join("").length !== 6}
          id="btn-verify-otp-submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {isVerifying ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Verifying OTP & Submitting...</span>
            </>
          ) : (
            <>
              <KeyRound className="w-4 h-4" />
              <span>Verify & Submit {formType} Form</span>
            </>
          )}
        </button>

        {/* Resend OTP Footer */}
        <div className="mt-4 text-center text-xs text-slate-400 flex items-center justify-between pt-3 border-t border-slate-800">
          <span>Didn't receive email?</span>
          <button
            onClick={handleResendOtp}
            disabled={!canResend}
            className="text-blue-400 hover:text-blue-300 font-semibold disabled:text-slate-500 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {canResend ? "Resend OTP" : `Resend in ${timer}s`}
          </button>
        </div>
      </div>
    </div>
  );
};
