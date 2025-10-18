import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import QuoteForm from '../components/QuoteForm'
import QuoteTable from '../components/QuoteTable'

export default function Admin() {
  const [admin, setAdmin] = useState(null)
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingQuote, setEditingQuote] = useState(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchQuotes()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkSession: true }),
      })

      if (response.ok) {
        const data = await response.json()
        setAdmin(data.admin)
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes')
      if (response.ok) {
        const data = await response.json()
        setQuotes(data.data)
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleAddQuote = () => {
    setEditingQuote(null)
    setShowForm(true)
  }

  const handleEditQuote = (quote) => {
    setEditingQuote(quote)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingQuote(null)
    fetchQuotes()
  }

  const handleDeleteQuote = async (id) => {
    if (!confirm('Are you sure you want to delete this quote?')) return

    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchQuotes()
      } else {
        alert('Error deleting quote')
      }
    } catch (error) {
      console.error('Error deleting quote:', error)
      alert('Error deleting quote')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!admin) {
    return null // Will redirect to login
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Inspirational Quotes</title>
        <meta name="description" content="Admin panel for managing inspirational quotes" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                <p className="text-gray-300">Welcome back, {admin.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Actions */}
          <div className="mb-8">
            <button
              onClick={handleAddQuote}
              className="btn-primary"
            >
              Add New Quote
            </button>
          </div>

          {/* Quote Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">
                      {editingQuote ? 'Edit Quote' : 'Add New Quote'}
                    </h2>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <QuoteForm
                    quote={editingQuote}
                    onSuccess={handleFormSuccess}
                    onCancel={() => setShowForm(false)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quotes Table */}
          <QuoteTable
            quotes={quotes}
            onEdit={handleEditQuote}
            onDelete={handleDeleteQuote}
          />
        </main>
      </div>
    </>
  )
}