import { useState, useEffect } from 'react'
import Head from 'next/head'
import QuoteCard from '../components/QuoteCard'

export default function Home({ initialQuotes = [] }) {
  const [quotes, setQuotes] = useState(initialQuotes)
  const [loading, setLoading] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [showStoryModal, setShowStoryModal] = useState(false)

  const fetchQuotes = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/quotes')
      if (response.ok) {
        const data = await response.json()
        setQuotes(data.data)
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialQuotes.length === 0) {
      fetchQuotes()
    }
  }, [initialQuotes])

  const handleCreateStory = (quote) => {
    setSelectedQuote(quote)
    setShowStoryModal(true)
  }

  const handleCloseModal = () => {
    setShowStoryModal(false)
    setSelectedQuote(null)
  }

  return (
    <>
      <Head>
        <title>Inspirational Quotes - Find Your Daily Motivation</title>
        <meta name="description" content="Discover beautiful inspirational quotes to brighten your day" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="relative z-10 p-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Inspirational Quotes
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover beautiful quotes to inspire and motivate you every day
          </p>
        </header>

        {/* Quotes Grid */}
        <main className="container mx-auto px-6 py-8">
          {loading && quotes.length === 0 ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : quotes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No quotes available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {quotes.map((quote) => (
                <QuoteCard
                  key={quote._id}
                  quote={quote}
                  onCreateStory={handleCreateStory}
                />
              ))}
            </div>
          )}
        </main>

        {/* Story Modal */}
        {showStoryModal && selectedQuote && (
          <StoryModal
            quote={selectedQuote}
            onClose={handleCloseModal}
          />
        )}

        {/* Footer */}
        <footer className="text-center py-8 text-gray-400">
          <p>&copy; 2024 Inspirational Quotes. Spread positivity and wisdom.</p>
        </footer>
      </div>
    </>
  )
}

function StoryModal({ quote, onClose }) {
  const [generating, setGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState(null)

  useEffect(() => {
    generateStoryImage()
  }, [quote])

  const generateStoryImage = async () => {
    setGenerating(true)
    try {
      // This would use html-to-image library in a real implementation
      // For now, we'll create a simple data URL
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 300
      canvas.height = 533 // 9:16 aspect ratio

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#7c3aed')
      gradient.addColorStop(1, '#ec4899')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add quote text
      ctx.fillStyle = quote.color || '#ffffff'
      ctx.font = `24px ${quote.fontFamily || 'Montserrat'}`
      ctx.textAlign = 'center'

      const text = `"${quote.text}"`
      const author = `- ${quote.author}`

      // Simple text wrapping and positioning
      const maxWidth = canvas.width - 40
      const lineHeight = 30

      // For demo purposes, we'll use a simple approach
      const dataUrl = canvas.toDataURL('image/png')
      setGeneratedImage(dataUrl)
    } catch (error) {
      console.error('Error generating story image:', error)
    } finally {
      setGenerating(false)
    }
  }

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.download = `quote-${quote._id}.png`
      link.href = generatedImage
      link.click()
    }
  }

  return (
    <div className="story-modal" onClick={onClose}>
      <div className="story-content" onClick={(e) => e.stopPropagation()}>
        {generating ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="ml-3 text-white">Generating...</span>
          </div>
        ) : generatedImage ? (
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center">
              <img
                src={generatedImage}
                alt="Quote Story"
                className="max-w-full max-h-full rounded-lg"
              />
            </div>
            <button
              onClick={downloadImage}
              className="btn-primary mt-4"
            >
              Download Image
            </button>
          </div>
        ) : (
          <div className="text-white text-center">
            <p>Failed to generate image</p>
            <button
              onClick={generateStoryImage}
              className="btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// This function runs on the server to pre-fetch quotes
export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/quotes`)
    if (response.ok) {
      const data = await response.json()
      return {
        props: {
          initialQuotes: data.data || []
        }
      }
    }
  } catch (error) {
    console.error('Error fetching quotes for SSR:', error)
  }

  return {
    props: {
      initialQuotes: []
    }
  }
}