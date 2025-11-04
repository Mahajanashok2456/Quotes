import { MetadataRoute } from "next";
import clientPromise from "@/lib/mongodb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://echoesofmahajan.vercel.app";

  // Remove trailing slash if present
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  // Static pages with actual content
  const staticPages = [
    { route: "", changeFreq: "daily" as const, priority: 1 },
    { route: "/about", changeFreq: "monthly" as const, priority: 0.8 },
    { route: "/contact", changeFreq: "monthly" as const, priority: 0.7 },
    { route: "/blog", changeFreq: "weekly" as const, priority: 0.9 },
    { route: "/categories", changeFreq: "weekly" as const, priority: 0.8 },
    { route: "/faq", changeFreq: "monthly" as const, priority: 0.7 },
    { route: "/resources", changeFreq: "monthly" as const, priority: 0.6 },
    { route: "/privacy", changeFreq: "yearly" as const, priority: 0.3 },
    { route: "/terms", changeFreq: "yearly" as const, priority: 0.3 },
  ];

  const staticUrls = staticPages.map((page) => ({
    url: `${cleanBaseUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  // Dynamic quote pages from database
  let quoteUrls: MetadataRoute.Sitemap = [];
  try {
    const { db } = await clientPromise();
    const quotes = await db
      .collection("quotes")
      .find({})
      .project({ _id: 1, updatedAt: 1 })
      .toArray();

    quoteUrls = quotes.map((quote: any) => ({
      url: `${cleanBaseUrl}/quotes/${quote._id.toString()}`,
      lastModified: quote.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching quotes for sitemap:", error);
  }

  // Dynamic blog posts from database (auto-updates when you add new posts)
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const { db } = await clientPromise();
    const blogs = await db
      .collection("blogs")
      .find({ isPublished: true })
      .project({ slug: 1, publishDate: 1, updatedAt: 1 })
      .toArray();

    blogUrls = blogs.map((blog: any) => ({
      url: `${cleanBaseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || blog.publishDate || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  // Dynamic category pages from database (auto-updates when you add new categories)
  let categoryUrls: MetadataRoute.Sitemap = [];
  try {
    const { db } = await clientPromise();
    const categories = await db
      .collection("categories")
      .find({ isActive: true })
      .project({ slug: 1, updatedAt: 1 })
      .toArray();

    categoryUrls = categories.map((category: any) => ({
      url: `${cleanBaseUrl}/categories/${category.slug}`,
      lastModified: category.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
  }

  // Return all URLs (static + dynamic)
  return [...staticUrls, ...quoteUrls, ...blogUrls, ...categoryUrls];
}
