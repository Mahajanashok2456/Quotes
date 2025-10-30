import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Echoes of Mahajan',
  description: 'Learn about Echoes of Mahajan\'s mission to provide deeply aesthetic and inspiring quotes, poetry, and thoughts. Discover our commitment to meaningful content and personal growth.',
  keywords: 'about us, mission, inspiration, quotes, poetry, personal growth, motivation, Echoes of Mahajan',
  openGraph: {
    title: 'About Us - Echoes of Mahajan',
    description: 'Learn about our mission to provide deeply aesthetic and inspiring quotes, poetry, and thoughts for personal growth and motivation.',
    type: 'website',
    url: 'https://quotes-website-self.vercel.app/about',
    siteName: 'Echoes of Mahajan',
  },
  twitter: {
    card: 'summary',
    title: 'About Us - Echoes of Mahajan',
    description: 'Learn about our mission to provide deeply aesthetic and inspiring quotes, poetry, and thoughts for personal growth and motivation.',
  },
  alternates: {
    canonical: 'https://quotes-website-self.vercel.app/about',
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-teal-900 via-slate-blue to-soft-peach text-light-cream p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center px-2"
          style={{ fontFamily: "var(--font-cookie)" }}
        >
          About Mahajan&apos;s Quotes
        </h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 sm:p-6 md:p-8 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-soft-peach">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            Mahajan&apos;s Quotes is a curated collection of profound words,
            poetry, and thoughts designed to inspire, motivate, and ignite the
            spirit of readers worldwide. We believe that the right words at the
            right time can transform perspectives and spark meaningful change.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-soft-peach">
            What We Offer
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            Our platform features a carefully selected assortment of quotes
            spanning various themes including wisdom, motivation, love, success,
            and personal growth. Each quote is chosen for its depth,
            authenticity, and potential to resonate with our diverse audience.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-soft-peach">
            Our Commitment
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            We are dedicated to providing a clean, aesthetic, and user-friendly
            experience that allows visitors to discover inspiration
            effortlessly. Our collection grows continuously as we seek out
            meaningful contributions from thinkers, writers, and visionaries
            across generations.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-soft-peach">
            Join Our Community
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Whether you&apos;re seeking daily inspiration, looking for the
            perfect quote to share, or simply exploring the beauty of language,
            Mahajan&apos;s Quotes welcomes you to our community of thoughtful
            readers and writers.
          </p>
        </div>
      </div>
    </div>
  );
}
