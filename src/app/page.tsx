"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Typewriter from "./Typewriter";
import { formatDate } from "../lib/utils";
import SkeletonLoader from "../components/SkeletonLoader";
import QuoteModal from "@/components/QuoteModal";

// Dynamic imports for code splitting
const DynamicQuoteCard = dynamic(() => import("../components/QuoteCard"), {
  loading: () => (
    <SkeletonLoader variant="card" className="break-inside-avoid" />
  ),
});

interface Quote {
  _id: string;
  text: string;
  author: string;
  font_family: string;
  font_color: string;
  likes: number;
  is_pinned: boolean;
  created_at: string;
}

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500); // 3.5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleCardClick = (quote: Quote) => {
    setSelectedQuote(quote);
  };

  const handleCloseModal = () => {
    setSelectedQuote(null);
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        // Add cache control headers for better caching
        const response = await fetch("/api/quotes", {
          next: { revalidate: 300 }, // Cache for 5 minutes
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          },
        });
        const data = await response.json();

        if (data.success) {
          const sortedQuotes = data.data.sort((a: Quote, b: Quote) => {
            if (a.is_pinned !== b.is_pinned) {
              return b.is_pinned ? 1 : -1;
            }
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
          setQuotes(sortedQuotes);
        } else {
          setError(data.error || "Failed to fetch quotes");
        }
      } catch (error) {
        setError("Failed to fetch quotes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen text-foreground p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader
                key={index}
                variant="card"
                className="break-inside-avoid"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground p-4 sm:p-8">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            // This is the main overlay container
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          >
            {/* Welcome Message (with a semi-transparent backdrop for readability) */}
            <div className="relative z-10 text-center text-white p-4 bg-black/30 rounded-lg">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.5 }}
                className="text-5xl md:text-7xl font-serif text-soft-peach"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
              >
                Lets connect with Thoughts !
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0, delay: 1.5 }}
                className="mt-4 text-lg md:text-xl text-light-cream"
              >
                A collection of own feelings...
              </motion.p>
            </div>

            {/* Video comes AFTER the text and is now smaller */}
            <motion.video
              autoPlay
              loop
              muted
              playsInline
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 2.0 }}
              className="w-full max-w-md rounded-lg mt-12 shadow-2xl shadow-purple-500/20"
            >
              <source src="/Flowers.webm" type="video/webm" />
            </motion.video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto mb-12">
        {/* Custom Font Text Centered */}
        <div className="text-center py-8 md:py-16 max-w-4xl mx-auto">
          {/* H1: Primary Title (Custom Font) */}
          <h1
            className="text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg
                       bg-gradient-to-b from-purple-500 to-white
                       bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-cookie)" }}
          >
            Did you felt the same?
          </h1>
          {/* P: Tagline (Custom Font) */}
          <p
            className="text-xl md:text-2xl drop-shadow-lg text-light-cream"
            style={{ fontFamily: "var(--font-homemade-apple)" }}
          >
            Nothing Just Real Thoughts !!
          </p>
        </div>
      </section>

      {quotes.length === 0 ? (
        <div className="max-w-6xl mx-auto text-center py-12">
          <h2 className="text-xl font-semibold">No quotes available</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Be the first to add a quote!
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <Suspense
              fallback={
                <SkeletonLoader variant="card" className="break-inside-avoid" />
              }
            >
              {quotes.map((quote) => (
                <DynamicQuoteCard
                  key={quote._id}
                  quote={quote}
                  onCardClick={handleCardClick}
                />
              ))}
            </Suspense>
          </div>
        </div>
      )}

      <QuoteModal quote={selectedQuote} onClose={handleCloseModal} />
    </div>
  );
}
