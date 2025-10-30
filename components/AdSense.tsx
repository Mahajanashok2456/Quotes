"use client";

import { useEffect, useRef, useState } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
  style = {},
}: AdSenseProps) {
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set a minimum height to prevent "No slot size" error
    if (adRef.current) {
      const rect = adRef.current.getBoundingClientRect();
      if (rect.width > 0) {
        setIsVisible(true);
      } else {
        // Wait for element to be visible
        const observer = new ResizeObserver(() => {
          const newRect = adRef.current?.getBoundingClientRect();
          if (newRect && newRect.width > 0) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
        observer.observe(adRef.current);
        return () => observer.disconnect();
      }
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      try {
        // Push ad to Google AdSense only after width is available
        // @ts-expect-error - adsbygoogle is injected by Google AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [isVisible]);

  const getMinHeight = () => {
    switch (adFormat) {
      case "rectangle":
        return "250px";
      case "vertical":
        return "600px";
      case "header":
        return "280px";
      default:
        return "90px";
    }
  };

  return (
    <div
      ref={adRef}
      className={`adsbygoogle-container ${className}`}
      style={{
        display: "block",
        minHeight: getMinHeight(),
        width: "100%",
        ...style
      }}
    >
      {isVisible && (
        <ins
          className={`adsbygoogle ${className}`}
          style={{
            display: "block",
            minHeight: getMinHeight(),
          }}
          data-ad-client="ca-pub-9258915549707323"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive.toString()}
        />
      )}
    </div>
  );
}
