import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Breadcrumb from "../../../../components/Breadcrumb";
import AdSense from "../../../../components/AdSense";
import { ADSENSE_CONFIG } from "../../../lib/adsense";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

// Enable static generation for blog post pages
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch blog post by slug from database
async function getBlogBySlug(slug: string) {
  try {
    await connectToDatabase();
    const blog = await Blog.findOne({ slug, isPublished: true }).lean();
    return blog ? JSON.parse(JSON.stringify(blog)) : null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// Fetch all published blogs for related posts
async function getAllBlogs() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishDate: -1 })
      .limit(3)
      .lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found - Echoes of Mahajan",
    };
  }

  return {
    title: `${post.title} - Inspirational Blog | Echoes of Mahajan`,
    description: post.excerpt || post.title,
    keywords: `${post.title.toLowerCase()}, inspiration, personal growth, mindfulness, motivation, wisdom, life lessons`,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      url: `https://quotes-website-self.vercel.app/blog/${post.slug}`,
      siteName: "Echoes of Mahajan",
      publishedTime: post.publishDate,
      authors: ["Echoes of Mahajan"],
      tags: ["inspiration", "personal growth", "mindfulness"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
    },
    alternates: {
      canonical: `https://quotes-website-self.vercel.app/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({ isPublished: true }).lean();
    return blogs.map((blog: any) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

const generateBlogPostSchema = (post: any) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  author: {
    "@type": "Organization",
    name: "Echoes of Mahajan",
    url: "https://quotes-website-self.vercel.app/",
  },
  publisher: {
    "@type": "Organization",
    name: "Echoes of Mahajan",
    url: "https://quotes-website-self.vercel.app/",
  },
  datePublished: post.publishDate,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://quotes-website-self.vercel.app/blog/${post.slug}`,
  },
});

// Helper function to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  const relatedPosts = await getAllBlogs();

  if (!post) {
    notFound();
  }

  // Filter out current post from related posts
  const filteredRelatedPosts = relatedPosts
    .filter((p: any) => p.slug !== slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen text-foreground p-4 sm:p-8 pt-20 sm:pt-24 lg:pt-28">
      {/* Structured Data */}
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogPostSchema(post)),
        }}
      />

      <div className="max-w-4xl mx-auto">
        <Breadcrumb />
      </div>

      {/* Hero Quote Section */}
      {(post.heroQuote || post.heroAuthor) && (
        <section className="w-full max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl">
            {post.heroQuote && (
              <blockquote className="text-2xl md:text-3xl font-serif italic text-light-cream mb-4 leading-relaxed">
                "{post.heroQuote}"
              </blockquote>
            )}
            {post.heroAuthor && (
              <cite className="text-lg text-soft-peach font-semibold not-italic">
                — {post.heroAuthor}
              </cite>
            )}
          </div>
        </section>
      )}

      {/* Header Banner Ad */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-center">
          <AdSense
            adSlot={ADSENSE_CONFIG.adSlots.headerBanner}
            adFormat={ADSENSE_CONFIG.formats.header}
            className="mb-4"
          />
        </div>
      </div>

      {/* Main Article */}
      <article className="max-w-4xl mx-auto bg-deep-teal/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-12 shadow-xl">
        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-white/10">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-soft-peach via-purple-300 to-soft-peach bg-clip-text text-transparent leading-tight"
            style={{ fontFamily: "var(--font-cookie)" }}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-light-cream/70 mb-6">
            <time dateTime={post.publishDate}>
              {post.publishDate ? formatDate(post.publishDate) : "Recent"}
            </time>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>

          {post.excerpt && (
            <p className="text-xl text-light-cream/90 leading-relaxed italic border-l-4 border-soft-peach pl-6">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Article Body with Markdown Rendering */}
        <div className="blog-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-soft-peach mb-6 mt-8 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold text-soft-peach mb-5 mt-8 first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold text-soft-peach mb-4 mt-6">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-xl font-semibold text-light-cream mb-3 mt-5">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="text-lg text-light-cream leading-relaxed mb-6">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-light-cream mb-6 space-y-2 ml-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-light-cream mb-6 space-y-2 ml-4">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-lg leading-relaxed">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-purple-500 pl-6 py-2 my-6 bg-slate-blue/20 rounded-r-lg italic text-light-cream/90">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-soft-peach hover:text-white underline decoration-dotted underline-offset-4 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-slate-blue/40 px-2 py-1 rounded text-soft-peach font-mono text-base">
                    {children}
                  </code>
                ) : (
                  <code
                    className={`${className} block bg-slate-blue/40 p-4 rounded-lg overflow-x-auto my-4 text-sm`}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-slate-blue/40 p-4 rounded-lg overflow-x-auto my-6 border border-white/10">
                  {children}
                </pre>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-bold">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-light-cream/90 italic">{children}</em>
              ),
              hr: () => <hr className="border-white/20 my-8" />,
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt || ""}
                  className="rounded-lg shadow-lg my-6 w-full"
                />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* In-Content Rectangle Ad */}
        <div className="my-12 flex justify-center">
          <AdSense
            adSlot={ADSENSE_CONFIG.adSlots.inContentRectangle}
            adFormat={ADSENSE_CONFIG.formats.rectangle}
            className="max-w-sm"
          />
        </div>

        {/* Related Posts Section */}
        {filteredRelatedPosts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-soft-peach">
              More Inspiring Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRelatedPosts.map((relatedPost: any) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-slate-blue/20 hover:bg-slate-blue/30 p-6 rounded-xl border border-white/10 transition-all duration-300 hover:scale-105"
                >
                  <h3 className="text-lg font-semibold text-soft-peach group-hover:text-white mb-2 transition-colors">
                    {relatedPost.title}
                  </h3>
                  {relatedPost.excerpt && (
                    <p className="text-sm text-light-cream/70 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  )}
                  {relatedPost.readTime && (
                    <p className="text-xs text-soft-peach/70 mt-3">
                      {relatedPost.readTime}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-white/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-soft-peach hover:text-white transition-colors text-lg font-semibold"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to All Articles
          </Link>
        </nav>
      </article>

      {/* Footer Banner Ad */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="flex justify-center">
          <AdSense
            adSlot={ADSENSE_CONFIG.adSlots.footerBanner}
            adFormat={ADSENSE_CONFIG.formats.footer}
            className="mb-8"
          />
        </div>
      </div>
    </div>
  );
}
