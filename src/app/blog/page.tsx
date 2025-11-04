import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "../../../components/Breadcrumb";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";

// Dynamic page that revalidates
export const dynamic = "force-dynamic";
export const revalidate = 0; // Always fetch fresh data

// Fetch blogs from the database
async function getBlogs() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishDate: -1, createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(blogs)); // Serialize for Next.js
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// Fetch categories from the database
async function getCategories() {
  try {
    await connectToDatabase();
    const categories = await Category.find({ isActive: true })
      .sort({ name: 1 })
      .lean();
    return JSON.parse(JSON.stringify(categories)); // Serialize for Next.js
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Blog - Inspirational Articles & Personal Growth Insights",
  description:
    "Discover inspirational articles on personal growth, mindfulness, motivation, and resilience. Read thought-provoking content about finding meaning and purpose in life.",
  keywords:
    "blog, inspiration, personal growth, mindfulness, motivation, resilience, self-improvement, wisdom, life lessons",
  openGraph: {
    title: "Blog - Inspirational Articles & Personal Growth Insights",
    description:
      "Discover inspirational articles on personal growth, mindfulness, motivation, and resilience. Read thought-provoking content about finding meaning and purpose in life.",
    type: "website",
    url: "https://echoesofmahajan.vercel.app/blog",
    siteName: "Echoes of Mahajan",
  },
  twitter: {
    card: "summary",
    title: "Blog - Inspirational Articles & Personal Growth Insights",
    description:
      "Discover inspirational articles on personal growth, mindfulness, motivation, and resilience.",
  },
  alternates: {
    canonical: "https://echoesofmahajan.vercel.app/blog",
  },
};

// Helper function to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const blogPosts = await getBlogs();
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
            Inspirational Insights
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl drop-shadow-lg text-light-cream"
            style={{ fontFamily: "var(--font-homemade-apple)" }}
          >
            Thoughts that inspire, stories that resonate
          </p>
        </div>

        {/* Internal Links Section - Dynamic Categories */}
        {categories.length > 0 && (
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <p className="text-light-cream/80 mb-4">
              Explore our collection of inspirational quotes organized by
              themes:
            </p>
            <div className="flex flex-wrap justify-center gap-3 px-4">
              {categories.map(
                (category: { _id: string; slug: string; name: string }) => (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug}`}
                    className="px-3 sm:px-4 py-2 bg-soft-peach/20 text-soft-peach rounded-full hover:bg-soft-peach/30 transition-colors text-xs sm:text-sm"
                  >
                    {category.name}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </section>

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto">
        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-light-cream text-lg">
              No blog posts available yet. Add some from the admin panel!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post: any) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-deep-teal/70 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 h-full flex flex-col">
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold mb-3 text-soft-peach group-hover:text-white transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-blue mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="text-sm text-light-cream/70 mb-4">
                      <span>
                        {post.publishDate
                          ? formatDate(post.publishDate)
                          : "Recent"}
                      </span>
                      {post.readTime && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {(post.heroQuote || post.heroAuthor) && (
                    <div className="mt-auto">
                      <div className="bg-slate-blue/20 rounded-lg p-4">
                        {post.heroQuote && (
                          <blockquote className="text-sm italic text-light-cream">
                            "{post.heroQuote}"
                          </blockquote>
                        )}
                        {post.heroAuthor && (
                          <cite className="text-xs text-soft-peach mt-2 block">
                            — {post.heroAuthor}
                          </cite>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
