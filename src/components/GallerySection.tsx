import React, { useState } from "react";
import { GalleryItem, VideoLicense } from "../types";
import { Image, Video, Award, Play, Eye, Sparkles } from "lucide-react";

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [activeTab, setActiveTab] = useState<"all" | "photos" | "toppers">("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredPhotos = gallery.filter((item) => {
    if (activeTab === "photos") return item.category === "Gallery" || item.category === "Classroom";
    if (activeTab === "toppers") return item.category === "Success Story";
    return true;
  });

  return (
    <section id="gallery" className="py-16 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
            <Image className="w-4 h-4" />
            <span>Academy Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Classroom Gallery & <span className="text-blue-500">Success Stories</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Glimpse into our active classroom environment and board toppers felicitations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "all", label: "All Items", icon: Sparkles },
            { id: "photos", label: "Classroom Gallery", icon: Image },
            { id: "toppers", label: "Toppers & Success Stories", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Photo Gallery Grid */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item.imageUrl)}
                className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:border-blue-500/50 transition transform hover:-translate-y-1"
              >
                <div className="aspect-4/3 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-4 bg-slate-900 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                  </div>

                  <div className="p-2 bg-slate-800 rounded-lg text-slate-300 group-hover:text-blue-400 transition">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-950 text-white p-2 rounded-xl transition cursor-pointer z-10"
              >
                ✕ Close
              </button>
              <img
                src={selectedImage}
                alt="Selected Lightbox"
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
