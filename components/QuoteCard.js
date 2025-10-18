import { useState } from 'react'

export default function QuoteCard({ quote, onCreateStory }) {
  const [showShareOptions, setShowShareOptions] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: 'Inspirational Quote',
      text: `"${quote.text}" - ${quote.author}`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareData.text)
        alert('Quote copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareData.text)
        alert('Quote copied to clipboard!')
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError)
      }
    }
  }

  const getFontFamilyClass = (fontFamily) => {
    switch (fontFamily) {
      case 'Playfair Display':
        return 'font-playfair'
      case 'Lora':
        return 'font-lora'
      case 'Montserrat':
      default:
        return 'font-montserrat'
    }
  }

  return (
    <div className="quote-card group">
      <div className="relative">
        {/* Quote Text */}
        <blockquote
          className={`text-xl md:text-2xl font-medium leading-relaxed mb-4 ${getFontFamilyClass(quote.fontFamily)}`}
          style={{ color: quote.color || '#ffffff' }}
        >
          "{quote.text}"
        </blockquote>

        {/* Author */}
        <cite
          className={`block text-lg opacity-80 ${getFontFamilyClass(quote.fontFamily)}`}
          style={{ color: quote.color || '#ffffff' }}
        >
          — {quote.author}
        </cite>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex space-x-2">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
              title="Share quote"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
            </button>

            <button
              onClick={() => onCreateStory(quote)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
              title="Create story"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Share Options Dropdown */}
        {showShareOptions && (
          <div className="absolute top-12 right-2 bg-slate-800 rounded-lg shadow-lg border border-slate-700 z-10">
            <button
              onClick={handleShare}
              className="block w-full px-4 py-2 text-left text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
            >
              Share Quote
            </button>
          </div>
        )}
      </div>
    </div>
  )
}