import connectToDatabase from '@/lib/mongodb';
import Quote from '@/models/Quote';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  try {
    // Connect to database and fetch quotes
    const { db } = await connectToDatabase();
    const quotesCollection = db.collection('quotes');
    const quotes = await quotesCollection.find({}).toArray();

    // Generate sitemap entries for each quote
    const quotePages = quotes.map((quote: any) => ({
      url: `${baseUrl}/quotes/${quote._id}`,
      lastModified: new Date(quote.created_at || quote.createdAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...quotePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return only static pages if quotes fetch fails
    return staticPages;
  }
}