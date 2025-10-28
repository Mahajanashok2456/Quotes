'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from './Typewriter';
import { formatDate } from '../lib/utils';

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
        const response = await fetch('/api/quotes');
        const data = await response.json();
        
        if (data.success) {
          const sortedQuotes = data.data.sort((a: Quote, b: Quote) => {
            if (a.is_pinned !== b.is_pinned) {
              return b.is_pinned ? 1 : -1;
            }
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });
          setQuotes(sortedQuotes);
        } else {
          setError(data.error || 'Failed to fetch quotes');
        }
      } catch {
        setError('Failed to fetch quotes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
          <p className="mt-4">Loading quotes...</p>
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
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          >
            {/* Welcome Message (with a semi-transparent backdrop for readability) */}
            <div className="relative z-10 text-center text-white p-4 bg-black/30 rounded-lg">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.5 }}
                className="text-5xl md:text-7xl font-serif text-soft-peach" 
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
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
              <source src="/Floral Animated Design.webm" type="video/webm" />
            </motion.video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative w-full max-w-6xl mx-auto mb-12">
        {/* 1. Purple Gradient Separator Bar */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-purple-700 to-deep-teal-900 shadow-xl" />

        {/* 2. Custom Font Text Centered Below the Bar */}
        <div className="relative text-center py-16 md:py-24 z-10 max-w-4xl mx-auto">
          {/* H1: Primary Title (Custom Font) */}
          <h1
            className="text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg text-soft-peach"
            style={{ fontFamily: 'var(--font-cookie)' }}
          >
            Did you felt the same?
          </h1>
          {/* P: Tagline (Custom Font) */}
          <p
            className="text-xl md:text-2xl drop-shadow-lg text-light-cream"
            style={{ fontFamily: 'var(--font-homemade-apple)' }}
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
              {quotes.map((quote) => (
                <QuoteCard key={quote._id} quote={quote} onCardClick={handleCardClick} />
              ))}
            </div>
          </div>
        )}
      <AnimatePresence>
        {selectedQuote && (
          <motion.div
            // This is the semi-transparent backdrop
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              // This is the modal content card
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the card
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative bg-light-cream border border-dark-maroon rounded-lg shadow-xl p-8 md:p-12 w-full max-w-5xl text-center max-h-[85vh] flex flex-col"
              style={{
                fontFamily: selectedQuote.font_family,
                color: selectedQuote.font_color || '#000000',
              }}
            >
              {/* Close Button */}
              <button 
                onClick={handleCloseModal} 
                className="absolute top-4 right-4 text-dark-maroon/50 hover:text-dark-maroon transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable content container */}
              <div className="overflow-y-auto pr-4 flex-grow">
                {/* Modal Content */}
                <p className="text-2xl md:text-3xl font-bold leading-tight mb-6 whitespace-pre-wrap break-words">
                  &quot;{selectedQuote.text}&quot;
                </p>
                <p className="text-xl md:text-2xl text-dark-maroon">— {selectedQuote.author}</p>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center items-center gap-6 mt-8 pt-4 border-t border-dark-maroon/20">
                 {/* You can reuse your like and copy buttons here */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuoteCard({ quote, onCardClick }: { quote: Quote; onCardClick: (quote: Quote) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [likes, setLikes] = useState(quote.likes || 0);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleLike = async (quoteId: string) => {
    try {
      // Check if quoteId is valid
      if (!quoteId || quoteId === 'undefined') {
        alert('Invalid quote ID provided');
        return;
      }

      // Immediate Update: Increment likes count optimistically
      setLikes(prevLikes => prevLikes + 1);

      const url = `/api/quotes/${encodeURIComponent(quoteId)}/like`;

      // Background Fetch: Start the API request
      const response = await fetch(url, {
        method: 'PUT',
      });

      const data = await response.json();

      // Error Reversion: If request fails, revert the optimistic update
      if (!response.ok || !data.success) {
        setLikes(prevLikes => prevLikes - 1); // Revert optimistic update
        const errorMessage = data.message || data.error || 'Unknown error';
        console.error('Failed to like quote:', errorMessage);
        alert(`Failed to like quote: ${errorMessage}`);
      }
    } catch {
      // Error Reversion: Revert optimistic update on network error
      setLikes(prevLikes => prevLikes - 1);
      console.error('Failed to like quote due to network error');
      alert('Failed to like quote due to network error');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quote.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
    } catch {
      alert('Failed to copy quote to clipboard');
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="break-inside-avoid rounded-xl bg-deep-teal/70 backdrop-blur-lg border border-white/10 shadow-md p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={() => onCardClick(quote)}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <p
            className={`text-xl mb-4 italic whitespace-pre-wrap ${!expanded && quote.text.length > 200 ? 'line-clamp-5' : ''}`}
            style={{
              fontFamily: quote.font_family || 'Arial, sans-serif',
              color: quote.font_color || '#000000'
            }}
          >
            &quot;<Typewriter text={quote.text} />&quot;
          </p>
          {quote.text.length > 200 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              className="text-sm font-semibold text-slate-blue hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline mt-2"
            >
              {expanded ? 'Read Less' : 'Read More'}
            </button>
          )}
          <p className="font-semibold text-right">— {quote.author}</p>
        </div>
        <div className="mt-4 mb-2">
          <p className="text-xs text-gray-400 text-right">
            {formatDate(quote.created_at)}
          </p>
        </div>
        <div className="flex items-center justify-end gap-4 mt-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleLike(quote._id);
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Like quote"
          >
            <HeartIcon />
            <span className="text-light-cream">{likes}</span>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={copied ? "Copied!" : "Copy quote"}
          >
            <CopyIcon />
            <span className="text-light-cream">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function HeartIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5 text-red-500" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5 text-gray-600 dark:text-gray-400" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
    </svg>
  );
}