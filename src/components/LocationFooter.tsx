import React from "react";
import { ACADEMY_CONFIG } from "../data";
import { MapPin, Phone, Mail, Clock, ShieldAlert, Lock, Heart, Award, ArrowUpRight } from "lucide-react";

interface LocationFooterProps {
  onOpenEnquiry: () => void;
  onOpenAdmission: () => void;
  onOpenPamphlet: () => void;
  setActiveTab: (tab: string) => void;
}

export const LocationFooter: React.FC<LocationFooterProps> = ({
  onOpenEnquiry,
  onOpenAdmission,
  onOpenPamphlet,
  setActiveTab,
}) => {
  return (
    <footer id="location" className="bg-slate-950 border-t border-slate-800 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Location & Map Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Latur City Campus</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Visit Smart Step Academy
            </h3>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Address:</strong>
                  Back of Dhanvantari Clinic, Latur, Maharashtra
                  <br />
                  <span className="text-amber-400 font-semibold">PIN Code: 413512</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <strong className="text-white">Batch Hours:</strong> Daily Evening 4:00 PM to 7:00 PM
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white">Professors:</strong> Prof. Shravan Sir & Prof. Lakhsham Bhole Sir
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=Dhanvantari+Clinic+Latur+413512`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition cursor-pointer"
              >
                <span>Open Directions in Google Maps</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map Frame */}
          <div className="lg:col-span-6 h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
            <iframe
              title="Smart Step Academy Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30325.21096739023!2d76.5492102!3d18.4087926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf83be24dfb501%3A0xdcc3b1b6d08dfa73!2sLatur%2C%20Maharashtra%20413512!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-0 filter grayscale-[20%] contrast-[110%]"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t border-slate-900 text-xs">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src={ACADEMY_CONFIG.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg border border-blue-500" referrerPolicy="no-referrer" />
              <span className="text-base font-black text-white">Smart Step Academy</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Latur's dedicated coaching class for 8th, 9th & 10th Standard SSC Board students in English, Mathematics, and Science.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Quick Navigation</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => setActiveTab("home")} className="hover:text-blue-400 transition cursor-pointer">Home</button></li>
              <li><button onClick={() => setActiveTab("schedule")} className="hover:text-blue-400 transition cursor-pointer">Timings & Schedule</button></li>
              <li><button onClick={() => setActiveTab("teachers")} className="hover:text-blue-400 transition cursor-pointer">Professors</button></li>
              <li><button onClick={() => setActiveTab("gallery")} className="hover:text-blue-400 transition cursor-pointer">Gallery & Video Lectures</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Admissions & Support</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={onOpenAdmission} className="hover:text-blue-400 transition cursor-pointer">Student Admission Form</button></li>
              <li><button onClick={onOpenEnquiry} className="hover:text-blue-400 transition cursor-pointer">Quick Enquiry Form</button></li>
              <li><button onClick={onOpenPamphlet} className="hover:text-amber-400 transition cursor-pointer">Download Pamphlet</button></li>
              <li><button onClick={() => setActiveTab("support")} className="hover:text-rose-400 transition cursor-pointer flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Support / Complaint Portal (support.html)</button></li>
              <li><button onClick={() => setActiveTab("admin")} className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-amber-400" /> Admin Portal (admin.html)</button></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Faculty & Contacts</h4>
            <p className="text-slate-400">• Prof. Shravan Sir</p>
            <p className="text-slate-400">• Prof. Lakhsham Bhole Sir</p>
            <p className="text-emerald-400 font-semibold pt-1">Phone: {ACADEMY_CONFIG.phonePrimary}</p>
            <p className="text-slate-400">Email: {ACADEMY_CONFIG.email}</p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-900 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} Smart Step Academy (Gravity Academy). All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Back of Dhanvantari Clinic, Latur - 413512</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
