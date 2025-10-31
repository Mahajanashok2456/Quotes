"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { formatDate } from "../lib/utils";

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

interface QuoteCardProps {
  quote: Quote;
  onCardClick: (quote: Quote) => void;
}

export default function QuoteCard({ quote, onCardClick }: QuoteCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [likes, setLikes] = useState(quote.likes || 0);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleLike = async (quoteId: string) => {
    try {
      if (!quoteId || quoteId === "undefined") {
        alert("Invalid quote ID provided");
        return;
      }

      setLikes((prevLikes) => prevLikes + 1);

      const url = `/api/quotes/${encodeURIComponent(quoteId)}/like`;

      const response = await fetch(url, {
        method: "PUT",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setLikes((prevLikes) => prevLikes - 1);
        const errorMessage = data.message || data.error || "Unknown error";
        console.error("Failed to like quote:", errorMessage);
        alert(`Failed to like quote: ${errorMessage}`);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setLikes((prevLikes) => prevLikes - 1);
      console.error("Failed to like quote due to network error");
      alert("Failed to like quote due to network error");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quote.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      alert("Failed to copy quote to clipboard");
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div
      ref={cardRef}
      className="break-inside-avoid rounded-xl bg-deep-teal/70 backdrop-blur-lg border border-white/10 shadow-md p-4 sm:p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={() => onCardClick(quote)}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <p
            className={`text-lg sm:text-xl mb-4 italic whitespace-pre-wrap ${
              !expanded && quote.text.length > 200 ? "line-clamp-5" : ""
            }`}
            style={{
              fontFamily: quote.font_family || "Arial, sans-serif",
              color: quote.font_color || "#000000",
            }}
          >
            "{quote.text}"
          </p>
          {quote.text.length > 200 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              className="text-sm font-semibold text-slate-blue hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline mt-2"
            >
              {expanded ? "Read Less" : "Read More"}
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
            className="flex items-center gap-1 px-4 py-2 sm:px-3 sm:py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
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
            className="flex items-center gap-1 px-4 py-2 sm:px-3 sm:py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
            aria-label={copied ? "Copied!" : "Copy quote"}
          >
            <CopyIcon />
            <span className="text-light-cream">
              {copied ? "Copied!" : "Copy"}
            </span>
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
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
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
