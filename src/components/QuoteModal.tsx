"use client";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Define the shape of the quote prop
interface Quote {
  _id: string;
  text: string;
  author: string;
  font_family: string;
  font_color: string;
}

interface QuoteModalProps {
  quote: Quote | null;
  onClose: () => void;
}

const QuoteModal = ({ quote, onClose }: QuoteModalProps) => {
  return (
    <AnimatePresence>
      {quote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close when clicking the backdrop
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the modal itself
            className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl max-h-[85vh] flex flex-col rounded-xl border border-red-500/50 bg-deep-teal-900 shadow-2xl mx-4"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 z-10 rounded-full bg-dark-maroon p-1 text-light-cream shadow-lg transition-transform hover:scale-110"
              aria-label="Close modal"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Scrollable Content Container */}
            <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 text-center">
              <div
                className="markdown-content font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed"
                style={{
                  fontFamily: quote.font_family || "Arial, sans-serif",
                  color: quote.font_color || "#000000",
                }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {quote.text}
                </ReactMarkdown>
              </div>

              <div className="flex items-center justify-center px-4">
                <div
                  className="h-px w-12 sm:w-20 bg-slate-blue/50"
                  style={{
                    backgroundColor:
                      `${quote.font_color}50` || "rgba(100, 116, 139, 0.5)",
                  }}
                />
                <p
                  className="mx-2 sm:mx-4 font-sans text-lg sm:text-xl"
                  style={{
                    fontFamily: quote.font_family || "Arial, sans-serif",
                    color: quote.font_color || "#000000",
                  }}
                >
                  — {quote.author}
                </p>
                <div
                  className="h-px w-12 sm:w-20 bg-slate-blue/50"
                  style={{
                    backgroundColor:
                      `${quote.font_color}50` || "rgba(100, 116, 139, 0.5)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
