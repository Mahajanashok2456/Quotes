'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { formatDate } from '../../lib/utils';

interface Quote {
  _id: string;
  text: string;
  author: string;
  font_family: string;
  font_color: string;
  is_pinned: boolean;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    font_family: 'Arial',
    font_color: '#000000'
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pinningId, setPinningId] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (status === 'unauthenticated') {
      router.push('/manage-content-a3f8b1c9/login');
    }
  }, [status, router]);

  // Fetch quotes
  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/quotes');
      const data = await response.json();

      if (data.success) {
        setQuotes(data.data);
      } else {
        setError(data.error || 'Failed to fetch quotes');
      }
    } catch {
      setError('Failed to fetch quotes');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = '/api/admin/quotes';
      const method = editingId ? 'PUT' : 'POST';

      const requestBody = editingId
        ? { ...formData, id: editingId }
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        // Reset form
        setFormData({
          text: '',
          author: '',
          font_family: 'Arial',
          font_color: '#000000'
        });
        setEditingId(null);

        // Refresh quotes
        fetchQuotes();
      } else {
        setError(data.error || `Failed to ${editingId ? 'update' : 'create'} quote`);
      }
    } catch {
      setError(`Failed to ${editingId ? 'update' : 'create'} quote`);
    }
  };

  const handleEdit = (quote: Quote) => {
    setFormData({
      text: quote.text,
      author: quote.author,
      font_family: quote.font_family,
      font_color: quote.font_color
    });
    setEditingId(quote._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote?')) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/admin/quotes?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh quotes
        fetchQuotes();
      } else {
        setError(data.error || 'Failed to delete quote');
      }
    } catch {
      setError('Failed to delete quote');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      text: '',
      author: '',
      font_family: 'Arial',
      font_color: '#000000'
    });
    setEditingId(null);
  };

  const handlePinToggle = async (quoteId: string) => {
    setPinningId(quoteId);

    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}/pin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // Refresh quotes
        fetchQuotes();
      } else {
        setError(data.error || 'Failed to toggle pin');
      }
    } catch {
      setError('Failed to toggle pin');
    } finally {
      setPinningId(null);
    }
  };

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
          <p className="mt-4">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (this shouldn't happen due to middleware, but just in case)
  if (status === 'unauthenticated') {
    return null; // Component will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              {session?.user && (
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  Welcome, {session.user.name || session.user.email}
                </div>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all quotes in the system
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              View Public Page
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Quote Form */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? 'Edit Quote' : 'Add New Quote'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label htmlFor="text" className="block text-sm font-medium mb-2">
                  Quote Text
                </label>
                <textarea
                  id="text"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                  placeholder="Enter the quote text"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-2">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                  placeholder="Author name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="font_family" className="block text-sm font-medium mb-2">
                  Font Family
                </label>
                <input
                  type="text"
                  id="font_family"
                  name="font_family"
                  value={formData.font_family}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                  placeholder="Font family (e.g., Arial, Times New Roman)"
                />
              </div>
              
              <div>
                <label htmlFor="font_color" className="block text-sm font-medium mb-2">
                  Font Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="font_color"
                    name="font_color"
                    value={formData.font_color}
                    onChange={handleInputChange}
                    className="w-12 h-10 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.font_color}
                    onChange={handleInputChange}
                    name="font_color"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {editingId ? 'Update Quote' : 'Add Quote'}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Quotes Table */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold">All Quotes</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage existing quotes ({quotes.length} total)
            </p>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
              <p className="mt-4">Loading quotes...</p>
            </div>
          ) : quotes.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No quotes found. Add your first quote above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Quote
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Font
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date Added
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Pin
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {quotes.map((quote) => (
                    <tr key={quote._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-normal max-w-xs">
                        <div className="text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
                          &quot;{quote.text}&quot;
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {quote.author}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          <span
                            className="font-medium"
                            style={{ fontFamily: quote.font_family }}
                          >
                            {quote.font_family}
                          </span>
                          <div
                            className="w-4 h-4 inline-block ml-2 border border-gray-300"
                            style={{ backgroundColor: quote.font_color }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {formatDate(quote.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handlePinToggle(quote._id)}
                          disabled={pinningId === quote._id}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            quote.is_pinned
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/50'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          } disabled:opacity-50`}
                        >
                          {pinningId === quote._id ? 'Pinning...' : quote.is_pinned ? '📍 Unpin' : '📌 Pin'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(quote)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(quote._id)}
                          disabled={deletingId === quote._id}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                        >
                          {deletingId === quote._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}