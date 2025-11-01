"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Breadcrumb from "../../../components/Breadcrumb";
import AdSense from "../../../components/AdSense";
import { ADSENSE_CONFIG } from "../../lib/adsense";

interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  affiliate?: boolean;
}

const resources: Resource[] = [
  // Inspirational Books
  {
    id: "1",
    title: "The Power of Now",
    description:
      "A spiritual guide to living in the present moment and finding inner peace.",
    link: "https://www.amazon.com/Power-Now-Guide-Spiritual-Enlightenment/dp/1577314808",
    category: "Inspirational Books",
    affiliate: true,
  },
  {
    id: "2",
    title: "Atomic Habits",
    description:
      "An easy and proven way to build good habits and break bad ones.",
    link: "https://jamesclear.com/atomic-habits",
    category: "Inspirational Books",
  },
  {
    id: "3",
    title: "Man's Search for Meaning",
    description:
      "A memoir by Viktor Frankl about finding purpose in suffering.",
    link: "https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl/dp/080701429X",
    category: "Inspirational Books",
    affiliate: true,
  },

  // Meditation Apps
  {
    id: "4",
    title: "Headspace",
    description:
      "Guided meditation and mindfulness exercises for stress relief and mental clarity.",
    link: "https://www.headspace.com",
    category: "Meditation Apps",
  },
  {
    id: "5",
    title: "Calm",
    description:
      "Sleep stories, meditation, and relaxation techniques for better mental health.",
    link: "https://www.calm.com",
    category: "Meditation Apps",
  },
  {
    id: "6",
    title: "Insight Timer",
    description:
      "Free meditation app with thousands of guided meditations from teachers worldwide.",
    link: "https://insighttimer.com",
    category: "Meditation Apps",
  },

  // Journaling Tools
  {
    id: "7",
    title: "Day One",
    description:
      "Beautiful journaling app for capturing memories and reflecting on life.",
    link: "https://dayoneapp.com",
    category: "Journaling Tools",
  },
  {
    id: "8",
    title: "Reflectly",
    description:
      "AI-powered journaling companion that helps you understand your emotions.",
    link: "https://reflectly.app",
    category: "Journaling Tools",
  },
  {
    id: "9",
    title: "Journey",
    description:
      "Private journaling app with mood tracking and photo attachments.",
    link: "https://journey.cloud",
    category: "Journaling Tools",
  },

  // Personal Development Courses
  {
    id: "10",
    title: "The Science of Well-Being (Yale)",
    description: "Free Coursera course on building a more fulfilling life.",
    link: "https://www.coursera.org/learn/the-science-of-well-being",
    category: "Personal Development Courses",
  },
  {
    id: "11",
    title: "Learning How to Learn (Coursera)",
    description: "Powerful mental tools to help you master tough subjects.",
    link: "https://www.coursera.org/learn/learning-how-to-learn",
    category: "Personal Development Courses",
  },
  {
    id: "12",
    title: "MasterClass - Personal Development",
    description: "Learn from experts like Brené Brown, J.K. Rowling, and more.",
    link: "https://www.masterclass.com",
    category: "Personal Development Courses",
  },

  // Related Websites & Blogs
  {
    id: "13",
    title: "Tiny Buddha",
    description: "Inspiration, wisdom, and compassion for a meaningful life.",
    link: "https://tinybuddha.com",
    category: "Related Websites & Blogs",
  },
  {
    id: "14",
    title: "Brain Pickings",
    description:
      "Maria Popova's blog on art, science, philosophy, and the human experience.",
    link: "https://www.brainpickings.org",
    category: "Related Websites & Blogs",
  },
  {
    id: "15",
    title: "The Marginalian",
    description:
      "Thoughts on what matters in art, science, and the human spirit.",
    link: "https://www.themarginalian.org",
    category: "Related Websites & Blogs",
  },
];

const categories = [
  "All",
  "Inspirational Books",
  "Meditation Apps",
  "Journaling Tools",
  "Personal Development Courses",
  "Related Websites & Blogs",
];

export default function ResourcesClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmitResource = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - for now just show an alert
    alert(
      "Thank you for your suggestion! We'll review it and add it to our resources if appropriate."
    );
    setShowForm(false);
  };

  return (
    <div className="min-h-screen text-foreground p-4 sm:p-8 pt-20 sm:pt-24 lg:pt-28">
      <div className="max-w-6xl mx-auto">
        <Breadcrumb />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-soft-peach"
            style={{ fontFamily: "var(--font-cookie)" }}
          >
            Inspirational Resources
          </h1>
          <p
            className="text-lg md:text-xl text-light-cream max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-homemade-apple)" }}
          >
            Discover tools and resources to enhance your personal growth journey
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-deep-teal/70 backdrop-blur-lg border border-white/10 text-light-cream placeholder-light-cream/70 focus:outline-none focus:ring-2 focus:ring-soft-peach"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-deep-teal/70 backdrop-blur-lg border border-white/10 text-light-cream focus:outline-none focus:ring-2 focus:ring-soft-peach"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="bg-deep-teal text-light-cream"
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Sidebar Ad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex justify-center">
            <AdSense
              adSlot={ADSENSE_CONFIG.adSlots.sidebarVertical}
              adFormat={ADSENSE_CONFIG.formats.vertical}
              className="max-w-sm"
            />
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-deep-teal/70 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-purple-600/20 text-soft-peach text-xs font-semibold rounded-full">
                  {resource.category}
                </span>
                {resource.affiliate && (
                  <span className="text-xs text-light-cream/70">Affiliate</span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-light-cream mb-2">
                {resource.title}
              </h3>
              <p className="text-light-cream/80 mb-4 text-sm leading-relaxed">
                {resource.description}
              </p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm font-medium"
              >
                Visit Resource
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-semibold text-soft-peach mb-4">
            Know of a Great Resource?
          </h2>
          <p className="text-light-cream/80 mb-6 max-w-2xl mx-auto">
            Help us grow our collection! Share inspirational resources that have
            helped you on your personal growth journey.
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium"
          >
            Suggest a Resource
          </button>
        </motion.div>

        {/* Suggestion Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-deep-teal/70 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-semibold text-light-cream mb-4">
              Suggest a Resource
            </h3>
            <form onSubmit={handleSubmitResource} className="space-y-4">
              <div>
                <label className="block text-light-cream mb-2">
                  Resource Title
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-deep-teal/50 border border-white/10 text-light-cream placeholder-light-cream/70 focus:outline-none focus:ring-2 focus:ring-soft-peach"
                  placeholder="Enter resource title"
                />
              </div>
              <div>
                <label className="block text-light-cream mb-2">Category</label>
                <select
                  required
                  className="w-full px-4 py-2 rounded-lg bg-deep-teal/50 border border-white/10 text-light-cream focus:outline-none focus:ring-2 focus:ring-soft-peach"
                >
                  <option value="" className="bg-deep-teal text-light-cream">
                    Select a category
                  </option>
                  {categories.slice(1).map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-deep-teal text-light-cream"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-light-cream mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-deep-teal/50 border border-white/10 text-light-cream placeholder-light-cream/70 focus:outline-none focus:ring-2 focus:ring-soft-peach resize-none"
                  placeholder="Brief description of the resource and its value"
                />
              </div>
              <div>
                <label className="block text-light-cream mb-2">Link</label>
                <input
                  type="url"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-deep-teal/50 border border-white/10 text-light-cream placeholder-light-cream/70 focus:outline-none focus:ring-2 focus:ring-soft-peach"
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium"
                >
                  Submit Suggestion
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Internal Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-semibold text-soft-peach mb-4">
            Explore More Inspiration
          </h2>
          <p className="text-light-cream/80 mb-6 max-w-2xl mx-auto">
            Discover quotes by category and read our inspirational blog posts
            for deeper insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              Browse Categories
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-blue/20 text-light-cream font-semibold rounded-lg hover:bg-slate-blue/30 transition-all duration-300"
            >
              Read Blog Posts
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-blue/20 text-light-cream font-semibold rounded-lg hover:bg-slate-blue/30 transition-all duration-300"
            >
              FAQ
            </Link>
          </div>
        </motion.div>

        {/* Footer Banner Ad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16"
        >
          <div className="flex justify-center">
            <AdSense
              adSlot={ADSENSE_CONFIG.adSlots.footerBanner}
              adFormat={ADSENSE_CONFIG.formats.footer}
              className="mb-8"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
