import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  FireIcon,
  HeartIcon,
  TrophyIcon,
  AcademicCapIcon,
  UsersIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";

// Dynamic page that revalidates
export const dynamic = "force-dynamic";
export const revalidate = 0; // Always fetch fresh data

export const metadata: Metadata = {
  title: "Quote Categories - Find Inspiration by Topic | Echoes of Mahajan",
  description:
    "Explore our curated collection of quote categories including motivation, love, success, wisdom, personal growth, and more. Find the perfect inspiration for every aspect of life.",
  keywords:
    "quote categories, motivation quotes, love quotes, success quotes, wisdom quotes, inspiration, personal growth, life lessons",
  openGraph: {
    title: "Quote Categories - Find Inspiration by Topic | Echoes of Mahajan",
    description:
      "Explore our curated collection of quote categories including motivation, love, success, wisdom, personal growth, and more.",
    type: "website",
    url: "https://quotes-website-self.vercel.app/categories",
    siteName: "Echoes of Mahajan",
  },
  twitter: {
    card: "summary",
    title: "Quote Categories - Find Inspiration by Topic",
    description:
      "Explore our curated collection of quote categories including motivation, love, success, wisdom, and more.",
  },
  alternates: {
    canonical: "https://quotes-website-self.vercel.app/categories",
  },
};

// Icon mapping for categories
const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  motivation: FireIcon,
  love: HeartIcon,
  success: TrophyIcon,
  wisdom: AcademicCapIcon,
  friendship: UsersIcon,
  inspiration: SparklesIcon,
  "personal-growth": ArrowTrendingUpIcon,
  "life-lessons": LightBulbIcon,
};

// Default color gradients for categories
const defaultColors: Record<string, string> = {
  motivation: "from-red-500 to-orange-500",
  love: "from-pink-500 to-rose-500",
  success: "from-green-500 to-emerald-500",
  wisdom: "from-blue-500 to-indigo-500",
  friendship: "from-yellow-500 to-amber-500",
  inspiration: "from-purple-500 to-violet-500",
  "personal-growth": "from-teal-500 to-cyan-500",
  "life-lessons": "from-gray-500 to-slate-500",
};

// Fetch categories from the database
async function getCategories() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(categories)); // Serialize for Next.js
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="min-h-screen text-foreground p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 lg:pt-28">
      <div className="max-w-6xl mx-auto">
        <Breadcrumb />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto mb-12">
        <div className="text-center py-8 md:py-16 max-w-4xl mx-auto px-4">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg bg-gradient-to-b from-purple-500 to-white bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-cookie)" }}
          >
            Quote Categories
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl drop-shadow-lg text-light-cream"
            style={{ fontFamily: "var(--font-homemade-apple)" }}
          >
            Discover inspiration across different themes and topics
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-light-cream text-lg">
              No categories available yet. Add some from the admin panel!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category: any) => {
              const IconComponent =
                categoryIcons[category.slug] || SparklesIcon;
              const categoryColor =
                defaultColors[category.slug] || "from-purple-500 to-indigo-500";

              return (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group"
                >
                  <article className="bg-deep-teal/70 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 h-full flex flex-col">
                    <div className="flex-grow">
                      {/* Category Icon/Preview */}
                      <div
                        className={`w-full h-32 rounded-lg mb-4 bg-gradient-to-br ${categoryColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
                      >
                        <IconComponent className="w-16 h-16 text-white drop-shadow-lg" />
                      </div>

                      <h2 className="text-xl font-bold mb-3 text-soft-peach group-hover:text-white transition-colors">
                        {category.name}
                      </h2>
                      <p className="text-slate-blue mb-4 line-clamp-3">
                        {category.description ||
                          "Explore this category for inspiring quotes."}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="text-sm text-light-cream/70">
                        <span className="inline-flex items-center gap-1">
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          Explore {category.name}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto mt-16 text-center">
        <div className="bg-deep-teal/30 rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-4 text-soft-peach">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-slate-blue mb-6">
            Browse our complete collection of quotes or explore our
            inspirational blog posts for more wisdom and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm sm:text-base"
            >
              Browse All Quotes
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-slate-blue/20 text-light-cream font-semibold rounded-lg hover:bg-slate-blue/30 transition-all duration-300 text-sm sm:text-base"
            >
              Read Blog Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-soft-peach">
          Explore More Content
        </h2>
        <p className="text-light-cream/80 mb-6">
          Discover inspirational articles and helpful resources for your
          personal growth journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm sm:text-base"
          >
            Read Blog Posts
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-slate-blue/20 text-light-cream font-semibold rounded-lg hover:bg-slate-blue/30 transition-all duration-300 text-sm sm:text-base"
          >
            View Resources
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-slate-blue/20 text-light-cream font-semibold rounded-lg hover:bg-slate-blue/30 transition-all duration-300 text-sm sm:text-base"
          >
            FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
