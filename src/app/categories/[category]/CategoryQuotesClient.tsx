"use client";

import { useState } from "react";
import QuoteCard from "../../../components/QuoteCard";
import QuoteModal from "../../../components/QuoteModal";

interface Quote {
  _id: string;
  text: string;
  author: string;
  font_family: string;
  font_color: string;
  is_pinned: boolean;
  created_at: string;
  category?: string;
  categoryName?: string;
  likes?: number;
}

interface CategoryQuotesClientProps {
  quotes: Quote[];
  categoryName: string;
}

export default function CategoryQuotesClient({
  quotes,
  categoryName,
}: CategoryQuotesClientProps) {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const handleCardClick = (quote: Quote) => {
    setSelectedQuote(quote);
  };

  const handleCloseModal = () => {
    setSelectedQuote(null);
  };

  if (quotes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-slate-blue/20 rounded-lg p-8 border border-white/10">
          <h3 className="text-xl font-semibold mb-2 text-soft-peach">
            No Quotes Yet
          </h3>
          <p className="text-slate-blue">
            No quotes have been added to the {categoryName.toLowerCase()}{" "}
            category yet. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 gap-6 space-y-6">
        {quotes.map((quote) => (
          <div key={quote._id} className="break-inside-avoid">
            <QuoteCard
              quote={{ ...quote, likes: quote.likes || 0 }}
              onCardClick={() => handleCardClick(quote)}
            />
          </div>
        ))}
      </div>

      {/* Quote Modal */}
      {selectedQuote && (
        <QuoteModal quote={selectedQuote} onClose={handleCloseModal} />
      )}
    </>
  );
}
