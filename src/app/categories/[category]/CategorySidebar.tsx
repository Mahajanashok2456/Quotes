"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdSense from "../../../../components/AdSense";
import { ADSENSE_CONFIG } from "../../../lib/adsense";

export default function CategorySidebar() {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Check if AdSense ads are loaded after a short delay
    const timer = setTimeout(() => {
      const adElements = document.querySelectorAll("ins.adsbygoogle");
      const hasLoadedAd = Array.from(adElements).some((ad) => {
        return (ad as HTMLElement).getAttribute("data-ad-status") === "filled";
      });
      setAdLoaded(hasLoadedAd);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        {/* Sidebar Ad - Only show container if ad loads */}
        {adLoaded && (
          <div className="bg-deep-teal/70 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-md mb-6">
            <div className="flex justify-center">
              <AdSense
                adSlot={ADSENSE_CONFIG.adSlots.sidebarVertical}
                adFormat={ADSENSE_CONFIG.formats.vertical}
                className="mb-4"
              />
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-deep-teal/70 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-bold mb-4 text-soft-peach">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              Browse All Quotes
            </Link>
            <Link
              href="/categories"
              className="block w-full px-4 py-2 bg-slate-blue/20 text-light-cream text-center font-semibold rounded-lg hover:bg-slate-blue/30 transition-all duration-300"
            >
              All Categories
            </Link>
            <Link
              href="/blog"
              className="block w-full px-4 py-2 bg-slate-blue/20 text-light-cream text-center font-semibold rounded-lg hover:bg-slate-blue/30 transition-all duration-300"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
