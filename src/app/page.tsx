"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Lottie from "lottie-react";
import Typewriter from "./Typewriter";
import { formatDate } from "../lib/utils";
import SkeletonLoader from "../components/SkeletonLoader";
import QuoteModal from "@/components/QuoteModal";
import heartAnimation from "../../public/heart.json";

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

  // Preload critical resources
  useEffect(() => {
    // No need to preload video anymore since we're using Lottie
    return () => {};
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2500); // Reduced to 2.5 seconds for faster loading

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
        const response = await fetch("/api/quotes");
        const data = await response.json();

        if (data.success) {
          const sortedQuotes = (data.data || []).sort((a: Quote, b: Quote) => {
            if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
            const at = new Date(
              a.created_at || (a as any).createdAt || 0
            ).getTime();
            const bt = new Date(
              b.created_at || (b as any).createdAt || 0
            ).getTime();
            return bt - at;
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
    <div className="min-h-screen text-foreground pt-16 sm:pt-20 lg:pt-24">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          >
            {/* Welcome Message */}
            <div className="relative z-10 text-center text-white px-4 bg-black/30 rounded-lg max-w-sm sm:max-w-md mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-soft-peach py-4"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
              >
                Let's connect with Thoughts!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="mt-2 mb-4 text-base sm:text-lg md:text-xl text-light-cream"
              >
                A collection of own feelings...
              </motion.p>
            </div>

            {/* Lottie Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md mt-6 sm:mt-8"
            >
              <Lottie
                animationData={heartAnimation}
                loop={true}
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto mb-8 sm:mb-12 px-4">
        <div className="text-center py-8 sm:py-12 md:py-16">
          {/* H1: Primary Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg
                        bg-gradient-to-b from-purple-500 to-white
                        bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-cookie)" }}
          >
            Did you feel the same?
          </h1>
          {/* P: Tagline */}
          <p
            className="text-lg sm:text-xl md:text-2xl drop-shadow-lg text-light-cream"
            style={{ fontFamily: "var(--font-homemade-apple)" }}
          >
            Nothing Just Real Thoughts!!
          </p>
        </div>
      </section>

      {/* Quotes Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
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
                  <SkeletonLoader
                    variant="card"
                    className="break-inside-avoid"
                  />
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
      </div>

      <QuoteModal quote={selectedQuote} onClose={handleCloseModal} />
    </div>
  );
}
