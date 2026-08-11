import React, { useState, useEffect } from "react";
import { BannerMarquee } from "./components/BannerMarquee";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { FacultySection } from "./components/FacultySection";
import { PamphletSection } from "./components/PamphletSection";
import { FaqSection } from "./components/FaqSection";
import { GallerySection } from "./components/GallerySection";
import { LocationFooter } from "./components/LocationFooter";
import { QuickEnquiryModal } from "./components/QuickEnquiryModal";
import { AdmissionModal } from "./components/AdmissionModal";
import { PamphletModal } from "./components/PamphletModal";
import { SupportComplaintPage } from "./components/SupportComplaintPage";
import { AdminPanelPage } from "./components/AdminPanelPage";

import { INITIAL_OFFERS, INITIAL_GALLERY, INITIAL_VIDEOS } from "./data";
import { OfferNotification, GalleryItem, VideoLicense } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  // Modals state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isPamphletOpen, setIsPamphletOpen] = useState(false);

  // Live database state
  const [offers, setOffers] = useState<OfferNotification[]>(INITIAL_OFFERS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [videos, setVideos] = useState<VideoLicense[]>(INITIAL_VIDEOS);

  // Fetch live database state from server
  useEffect(() => {
    fetchLiveState();
  }, []);

  const fetchLiveState = async () => {
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.record) {
          if (Array.isArray(data.record.offers) && data.record.offers.length > 0) {
            setOffers(data.record.offers);
          }
          if (Array.isArray(data.record.gallery) && data.record.gallery.length > 0) {
            setGallery(data.record.gallery);
          }
          if (Array.isArray(data.record.videos) && data.record.videos.length > 0) {
            setVideos(data.record.videos);
          }
        }
      }
    } catch (err) {
      console.error("Failed to load initial live state:", err);
    }
  };

  // Support route checks (if URL path is /support or /admin)
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/support" || path === "/support.html") {
      setActiveTab("support");
    } else if (path === "/admin" || path === "/admin.html") {
      setActiveTab("admin");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Banner Marquee for Offers */}
      <BannerMarquee offers={offers} />

      {/* Main Navbar */}
      <Navbar
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenPamphlet={() => setIsPamphletOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Body Routing */}
      <main className="flex-1">
        {activeTab === "support" ? (
          <SupportComplaintPage />
        ) : activeTab === "admin" ? (
          <AdminPanelPage />
        ) : (
          <div>
            <HeroSection
              onOpenEnquiry={() => setIsEnquiryOpen(true)}
              onOpenAdmission={() => setIsAdmissionOpen(true)}
              onOpenPamphlet={() => setIsPamphletOpen(true)}
            />

            <ScheduleSection onOpenAdmission={() => setIsAdmissionOpen(true)} />

            <FacultySection onOpenEnquiry={() => setIsEnquiryOpen(true)} />

            <PamphletSection
              onOpenPamphlet={() => setIsPamphletOpen(true)}
              onOpenAdmission={() => setIsAdmissionOpen(true)}
            />

            <FaqSection
              onOpenEnquiry={() => setIsEnquiryOpen(true)}
              onOpenAdmission={() => setIsAdmissionOpen(true)}
              onOpenPamphlet={() => setIsPamphletOpen(true)}
            />

            <GallerySection gallery={gallery} videos={videos} />
          </div>
        )}
      </main>

      {/* Footer & Location */}
      <LocationFooter
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenPamphlet={() => setIsPamphletOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* Reusable Modals */}
      <QuickEnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />

      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
      />

      <PamphletModal
        isOpen={isPamphletOpen}
        onClose={() => setIsPamphletOpen(false)}
      />
    </div>
  );
}
