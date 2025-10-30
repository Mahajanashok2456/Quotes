"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { formatDate } from "../../lib/utils";
import AdminCategoryManager from "../../components/AdminCategoryManager";
import AdminBlogManager from "../../components/AdminBlogManager";

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
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  created_at: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    text: "",
    author: "",
    category: "",
    font_family: "Arial",
    font_color: "#000000",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pinningId, setPinningId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("quotes");
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    slug: "",
  });
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    slug: "",
    content: "",
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (status === "unauthenticated") {
      router.push("/manage-content-a3f8b1c9/login");
    }
  }, [status, router]);

  // Fetch quotes, categories, and blogs
  useEffect(() => {
    fetchQuotes();
    fetchCategories();
    fetchBlogs();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/quotes");
      const data = await response.json();

      if (data.success) {
        setQuotes(data.data);
      } else {
        setError(data.error || "Failed to fetch quotes");
      }
    } catch (error) {
      setError("Failed to fetch quotes");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories");
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      } else {
        setError(data.error || "Failed to fetch categories");
      }
    } catch (error) {
      setError("Failed to fetch categories");
    }
  };

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim();
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = "/api/admin/quotes";
      const method = editingId ? "PUT" : "POST";

      const requestBody = editingId ? { ...formData, id: editingId } : formData;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        // Reset form
        setFormData({
          text: "",
          author: "",
          category: "",
          font_family: "Arial",
          font_color: "#000000",
        });
        setEditingId(null);

        // Refresh quotes
        fetchQuotes();
      } else {
        setError(
          data.error || `Failed to ${editingId ? "update" : "create"} quote`
        );
      }
    } catch (error) {
      setError(`Failed to ${editingId ? "update" : "create"} quote`);
    }
  };

  const handleEdit = (quote: Quote) => {
    setFormData({
      text: quote.text,
      author: quote.author,
      category: quote.categoryName || "",
      font_family: quote.font_family,
      font_color: quote.font_color,
    });
    setEditingId(quote._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/admin/quotes?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh quotes
        fetchQuotes();
      } else {
        setError(data.error || "Failed to delete quote");
      }
    } catch (error) {
      setError("Failed to delete quote");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      text: "",
      author: "",
      category: "",
      font_family: "Arial",
      font_color: "#000000",
    });
    setEditingId(null);
  };

  const handlePinToggle = async (quoteId: string) => {
    setPinningId(quoteId);

    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}/pin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        // Refresh quotes
        fetchQuotes();
      } else {
        setError(data.error || "Failed to toggle pin");
      }
    } catch (error) {
      setError("Failed to toggle pin");
    } finally {
      setPinningId(null);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const slug = categoryFormData.slug || generateSlug(categoryFormData.name);
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryFormData.name,
          slug,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCategoryFormData({ name: "", slug: "" });
        fetchCategories();
      } else {
        setError(data.error || "Failed to create category");
      }
    } catch (error) {
      setError("Failed to create category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/categories?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        fetchCategories();
      } else {
        setError(data.error || "Failed to delete category");
      }
    } catch (error) {
      setError("Failed to delete category");
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const slug = blogFormData.slug || generateSlug(blogFormData.title);
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blogFormData.title,
          slug,
          content: blogFormData.content,
          excerpt: blogFormData.content.substring(0, 200) + "...",
          publishDate: new Date().toISOString().split("T")[0],
          readTime: "5 min read",
          isPublished: true, // Set to true so blogs appear on frontend
          heroQuote: "",
          heroAuthor: "",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBlogFormData({ title: "", slug: "", content: "" });
        fetchBlogs();
      } else {
        setError(data.error || "Failed to create blog post");
      }
    } catch (error) {
      setError("Failed to create blog post");
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs");
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);
      } else {
        setError(data.error || "Failed to fetch blogs");
      }
    } catch (error) {
      setError("Failed to fetch blogs");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blogs?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        fetchBlogs();
      } else {
        setError(data.error || "Failed to delete blog post");
      }
    } catch (error) {
      setError("Failed to delete blog post");
    }
  };

  // Show loading while checking authentication
  if (status === "loading") {
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
  if (status === "unauthenticated") {
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
              Manage all content in the system
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              View Public Page
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 mb-8 sticky top-4 z-10">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("quotes")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "quotes"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Quotes
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "categories"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "blogs"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Blogs
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === "quotes" && (
          <>
            {/* Quote Form */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {editingId ? "Edit Quote" : "Add New Quote"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium mb-2"
                    >
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
                    <label
                      htmlFor="author"
                      className="block text-sm font-medium mb-2"
                    >
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
                    <label
                      htmlFor="font_family"
                      className="block text-sm font-medium mb-2"
                    >
                      Font Family
                    </label>
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium mb-2"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                      >
                        <option value="">Select a category (optional)</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    {editingId ? "Update Quote" : "Add Quote"}
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
                  <p className="text-gray-600 dark:text-gray-400">
                    No quotes found. Add your first quote above!
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Quote
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Author
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Font
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Date Added
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Pin
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      {quotes.map((quote) => (
                        <tr
                          key={quote._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-6 py-4 whitespace-normal max-w-xs">
                            <div className="text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
                              "{quote.text}"
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
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/50"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                              } disabled:opacity-50`}
                            >
                              {pinningId === quote._id
                                ? "Pinning..."
                                : quote.is_pinned
                                ? "📍 Unpin"
                                : "📌 Pin"}
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
                              {deletingId === quote._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "categories" && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Category Management</h2>

            {/* Add Category Form */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Add New Category</h3>
              <form onSubmit={handleCategorySubmit} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Category name"
                  value={categoryFormData.name}
                  onChange={(e) =>
                    setCategoryFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                  required
                />
                <input
                  type="text"
                  placeholder="Slug (auto-generated)"
                  value={categoryFormData.slug}
                  onChange={(e) =>
                    setCategoryFormData((prev) => ({
                      ...prev,
                      slug: e.target.value,
                    }))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Add Category
                </button>
              </form>
            </div>

            {/* Categories List */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date Added
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {categories.map((category) => (
                    <tr
                      key={category._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {category.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {formatDate(category.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "blogs" && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Blog Post Management
            </h2>

            {/* Add Blog Form */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Add New Blog Post</h3>
              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Blog title"
                    value={blogFormData.title}
                    onChange={(e) =>
                      setBlogFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Slug (auto-generated)"
                    value={blogFormData.slug}
                    onChange={(e) =>
                      setBlogFormData((prev) => ({
                        ...prev,
                        slug: e.target.value,
                      }))
                    }
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                    required
                  />
                </div>
                <textarea
                  placeholder="Blog content"
                  value={blogFormData.content}
                  onChange={(e) =>
                    setBlogFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                  rows={6}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Add Blog Post
                </button>
              </form>
            </div>

            {/* Blogs List */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date Added
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {blogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {blog.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {blog.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {formatDate(blog.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
