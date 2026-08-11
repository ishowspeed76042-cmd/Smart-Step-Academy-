import React from "react";
import { OfferNotification } from "../types";
import { Sparkles, Bell } from "lucide-react";

interface BannerMarqueeProps {
  offers: OfferNotification[];
}

export const BannerMarquee: React.FC<BannerMarqueeProps> = ({ offers }) => {
  const activeOffers = offers.filter((o) => o.isActive);

  if (activeOffers.length === 0) return null;

  return (
    <div id="offers-marquee" className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-slate-950 font-medium py-2.5 px-4 shadow-md overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-slate-950 text-amber-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shrink-0 shadow-sm">
          <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Announcements</span>
        </div>

        <div className="overflow-hidden relative w-full">
          <div className="flex animate-marquee whitespace-nowrap gap-12 items-center text-sm font-semibold text-slate-950">
            {activeOffers.concat(activeOffers).map((offer, idx) => (
              <div key={offer.id + "-" + idx} className="inline-flex items-center gap-2">
                {offer.badge && (
                  <span className="bg-slate-900 text-white text-[11px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {offer.badge}
                  </span>
                )}
                <span>{offer.title}</span>
                <span className="text-slate-800 opacity-90 font-normal hidden sm:inline">
                  — {offer.description}
                </span>
                <Sparkles className="w-4 h-4 text-slate-950 inline ml-3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
