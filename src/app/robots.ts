export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/manage-content-a3f8b1c9/',
          '/manage-mahajan/',
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/manage-content-a3f8b1c9/',
          '/manage-mahajan/',
          '/api/',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://quotes-website-self.vercel.app/'}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_BASE_URL || 'https://quotes-website-self.vercel.app/',
  };
}