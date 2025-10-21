export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/manage-content-a3f8b1c9', '/manage-mahajan', '/api/auth'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'}/sitemap.xml`,
  };
}