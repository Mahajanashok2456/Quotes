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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #7c3aed 50%, #ec4899 100%)' }}>
        {/* Header */}
        <header style={{
          position: 'relative',
          zIndex: '10',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px'
          }}>
            Inspirational Quotes
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#d1d5db',
            maxWidth: '512px',
            margin: '0 auto'
          }}>
            Discover beautiful quotes to inspire and motivate you every day
          </p>
        </header>

        {/* Quotes Grid */}
        <main style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          paddingBottom: '32px'
        }}>
          {loading && quotes.length === 0 ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '2px solid white',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
          ) : quotes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <p style={{ color: '#9ca3af', fontSize: '18px' }}>No quotes available at the moment.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px'
            }}>
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
        <footer style={{
          textAlign: 'center',
          padding: '32px 0',
          color: '#9ca3af'
        }}>
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
    // Check if MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      console.log('MongoDB URI not found, using fallback quotes')
      return {
        props: {
          initialQuotes: getFallbackQuotes()
        }
      }
    }

    // Connect directly to MongoDB for SSR
    const { MongoClient } = require('mongodb')
    const client = new MongoClient(process.env.MONGODB_URI)

    await client.connect()
    const db = client.db()

    const quotes = await db.collection('quotes')
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray()

    await client.close()

    // Convert MongoDB ObjectIds to strings for JSON serialization
    const serializedQuotes = quotes.map(quote => ({
      ...quote,
      _id: quote._id.toString(),
      createdAt: quote.createdAt ? quote.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: quote.updatedAt ? quote.updatedAt.toISOString() : new Date().toISOString()
    }))

    return {
      props: {
        initialQuotes: serializedQuotes || getFallbackQuotes()
      }
    }
  } catch (error) {
    console.error('Error fetching quotes for SSR:', error.message)
    return {
      props: {
        initialQuotes: getFallbackQuotes()
      }
    }
  }
}

// Fallback quotes when database is not available
function getFallbackQuotes() {
  return [
    {
      _id: '1',
      text: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
      fontFamily: 'Playfair Display',
      color: '#fbbf24',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '2',
      text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
      author: 'Winston Churchill',
      fontFamily: 'Lora',
      color: '#10b981',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '3',
      text: 'The future belongs to those who believe in the beauty of their dreams.',
      author: 'Eleanor Roosevelt',
      fontFamily: 'Montserrat',
      color: '#ec4899',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}