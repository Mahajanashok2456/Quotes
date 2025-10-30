import connectToDatabase from '@/lib/mongodb';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://quotes-website-self.vercel.app/';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  try {
    // Connect to database and fetch quotes
    const { db } = await connectToDatabase();
    const quotesCollection = db.collection('quotes');
    const quotes = await quotesCollection.find({}).toArray();

    // Generate sitemap entries for each quote
    const quotePages = quotes.map((quote: { _id: string; created_at?: string; createdAt?: string }) => ({
      url: `${baseUrl}/quotes/${quote._id}`,
      lastModified: new Date(quote.created_at || quote.createdAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Add blog posts to sitemap
    const blogPosts = [
      'the-power-of-daily-reflection',
      'finding-motivation-in-small-victories',
      'embracing-imperfection',
      'building-resilience-through-challenges',
      'the-art-of-mindful-living'
    ];

    const blogPages = blogPosts.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Add category pages to sitemap
    const categories = [
      'motivation',
      'love',
      'success',
      'wisdom',
      'inspiration',
      'life',
      'happiness',
      'friendship'
    ];

    const categoryPages = categories.map((category) => ({
      url: `${baseUrl}/categories/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...staticPages, ...quotePages, ...blogPages, ...categoryPages];
  } catch (error) {
    
    // Return only static pages if quotes fetch fails
    return staticPages;
  }
}