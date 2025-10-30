"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type ConsentState = "granted" | "denied" | "pending";

const STORAGE_KEY = "cookie_consent_state_v1";

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>("pending");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ConsentState | null;
      if (saved === "granted" || saved === "denied") {
        setConsent(saved);
        // Re-apply consent on load in case of hard refresh
        updateConsent(saved);
      }
    } catch {
      // ignore storage errors (Safari private, etc.)
    }
  }, []);

  const updateConsent = (state: Exclude<ConsentState, "pending">) => {
    // Update Google Consent Mode v2
    // Note: functionality_storage and security_storage are essential; keep granted
    const granted = state === "granted" ? "granted" : "denied";
    window.gtag?.("consent", "update", {
      ad_storage: granted,
      analytics_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
      // Keep essential storage granted
      functionality_storage: "granted",
      security_storage: "granted",
    });
  };

  const onAcceptAll = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "granted");
    } catch {}
    setConsent("granted");
    updateConsent("granted");
  };

  const onRejectAll = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "denied");
    } catch {}
    setConsent("denied");
    updateConsent("denied");
  };

  if (consent !== "pending") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[10000]">
      <div className="mx-auto max-w-5xl px-4 pb-6">
        <div className="rounded-2xl bg-gray-900/90 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur supports-[backdrop-filter]:bg-gray-900/70">
          <div className="p-4 sm:p-5">
            <p className="text-sm leading-6">
              We use cookies to personalize content, measure performance, and
              show ads. By clicking “Accept all”, you consent to analytics and
              personalized advertising. Click “Reject all” to use only essential
              cookies. You can change your choice anytime in your browser.
            </p>
            <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={onRejectAll}
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Reject all
              </button>
              <button
                onClick={onAcceptAll}
                className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-500 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 transition-colors"
              >
                Accept all
              </button>
            </div>
            <div className="mt-3 text-xs opacity-80">
              <a href="/privacy" className="underline hover:text-purple-300">
                Privacy Policy
              </a>
              <span className="mx-1">•</span>
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-purple-300"
              >
                How Google uses data
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
