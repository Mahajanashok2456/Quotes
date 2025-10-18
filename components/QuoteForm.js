import { useState, useEffect } from 'react'

export default function QuoteForm({ quote, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    fontFamily: 'Montserrat',
    color: '#ffffff'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fontOptions = [
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Playfair Display', label: 'Playfair Display' },
    { value: 'Lora', label: 'Lora' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' }
  ]

  useEffect(() => {
    if (quote) {
      setFormData({
        text: quote.text || '',
        author: quote.author || '',
        fontFamily: quote.fontFamily || 'Montserrat',
        color: quote.color || '#ffffff'
      })
    }
  }, [quote])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = quote ? `/api/quotes/${quote._id}` : '/api/quotes'
      const method = quote ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        onSuccess()
      } else {
        setError(data.error || 'An error occurred')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-md">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-2">
          Quote Text *
        </label>
        <textarea
          id="text"
          name="text"
          required
          rows={4}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter the inspirational quote..."
          value={formData.text}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
          Author *
        </label>
        <input
          type="text"
          id="author"
          name="author"
          required
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter the author name..."
          value={formData.author}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-300 mb-2">
            Font Family
          </label>
          <select
            id="fontFamily"
            name="fontFamily"
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.fontFamily}
            onChange={handleChange}
          >
            {fontOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-300 mb-2">
            Text Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              id="color"
              name="color"
              className="w-16 h-10 bg-slate-700 border border-slate-600 rounded-md cursor-pointer"
              value={formData.color}
              onChange={handleChange}
            />
            <input
              type="text"
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm"
              placeholder="#ffffff"
              value={formData.color}
              onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-slate-700/50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Preview</h3>
        <div className="bg-slate-800 rounded p-4">
          <blockquote
            className={`text-lg font-medium leading-relaxed mb-2 font-${formData.fontFamily.toLowerCase().replace(' ', '-')}`}
            style={{ color: formData.color }}
          >
            "{formData.text || 'Your quote will appear here...'}"
          </blockquote>
          <cite
            className={`block text-sm opacity-80 font-${formData.fontFamily.toLowerCase().replace(' ', '-')}`}
            style={{ color: formData.color }}
          >
            — {formData.author || 'Author'}
          </cite>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : (quote ? 'Update Quote' : 'Add Quote')}
        </button>
      </div>
    </form>
  )
}