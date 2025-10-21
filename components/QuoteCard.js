import { useState } from 'react'
import { formatDate } from '../src/lib/utils.js'

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
    } catch (_) {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareData.text)
        alert('Quote copied to clipboard!')
      } catch (_) {
        // Silently handle clipboard errors
      }
    }
  }

  const getFontFamily = (fontFamily) => {
    switch (fontFamily) {
      case 'Playfair Display':
        return '"Playfair Display", serif'
      case 'Lora':
        return '"Lora", serif'
      case 'Montserrat':
      default:
        return '"Montserrat", sans-serif'
    }
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ position: 'relative' }}>
        {/* Quote Text */}
        <blockquote
          style={{
            fontSize: '20px',
            fontWeight: '500',
            lineHeight: '1.6',
            marginBottom: '16px',
            color: quote.color || '#ffffff',
            fontFamily: getFontFamily(quote.fontFamily)
          }}
        >
          &quot;{quote.text}&quot;
        </blockquote>

        {/* Author */}
        <cite
          style={{
            display: 'block',
            fontSize: '18px',
            opacity: '0.8',
            color: quote.color || '#ffffff',
            fontFamily: getFontFamily(quote.fontFamily)
          }}
        >
          &mdash; {quote.author}
        </cite>

        {/* Bottom Section with Timestamp and Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Timestamp */}
          <p style={{
            fontSize: '12px',
            color: 'rgba(148, 163, 184, 0.8)',
            margin: '0'
          }}>
            Added: {formatDate(quote.created_at)}
          </p>

          {/* Action Buttons Container (for future buttons) */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Space for future Like/Copy buttons */}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          opacity: '0',
          transition: 'opacity 0.2s ease'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              style={{
                padding: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              title="Share quote"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
            </button>

            <button
              onClick={() => onCreateStory(quote)}
              style={{
                padding: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              title="Create story"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'white' }}>
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Share Options Dropdown */}
        {showShareOptions && (
          <div style={{
            position: 'absolute',
            top: '48px',
            right: '8px',
            background: '#1e293b',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #334155',
            zIndex: '10'
          }}>
            <button
              onClick={handleShare}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                textAlign: 'left',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
            >
              Share Quote
            </button>
          </div>
        )}
      </div>
    </div>
  )
}