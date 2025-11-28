import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Echoes of Mahajan",
  description:
    "Learn about Echoes of Mahajan's mission to provide deeply aesthetic and inspiring quotes, poetry, and thoughts. Discover our commitment to meaningful content and personal growth.",
  keywords:
    "about us, mission, inspiration, quotes, poetry, personal growth, motivation, Echoes of Mahajan",
  openGraph: {
    title: "About Us - Echoes of Mahajan",
    description:
      "Learn about our mission to provide deeply aesthetic and inspiring quotes, poetry, and thoughts for personal growth and motivation.",
    type: "website",
    url: "https://echoesofmahajan.vercel.app/about",
    siteName: "Echoes of Mahajan",
  },
  twitter: {
    card: "summary",
    title: "About Us - Echoes of Mahajan",
    description:
      "Learn about our mission to provide deeply aesthetic and inspiring quotes, poetry, and thoughts for personal growth and motivation.",
  },
  alternates: {
    canonical: "https://echoesofmahajan.vercel.app/about",
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-teal-900 via-slate-blue to-soft-peach text-light-cream p-4 sm:p-6 md:p-8 pt-20 sm:pt-24 lg:pt-28">
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
            In a world filled with noise and distractions, we provide a sanctuary
            of wisdom where readers can find clarity, purpose, and inspiration.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            Our mission extends beyond simply sharing quotes. We aim to create a
            meaningful digital space where people can connect with timeless wisdom,
            discover new perspectives, and find the motivation they need to overcome
            life&apos;s challenges. Each quote is carefully selected to provide value,
            insight, and emotional resonance.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-soft-peach">
            What We Offer
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            Our platform features a carefully selected assortment of quotes
            spanning various themes including wisdom, motivation, love, success,
            and personal growth. Each quote is chosen for its depth,
            authenticity, and potential to resonate with our diverse audience.
            We organize our content into thoughtfully curated categories, making
            it easy for you to find exactly the inspiration you&apos;re seeking.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            Whether you&apos;re looking for morning motivation, words of comfort during
            difficult times, or insights to guide your personal development journey,
            Echoes of Mahajan provides a comprehensive collection that speaks to every
            aspect of the human experience. Our quotes come from diverse sources,
            cultures, and time periods, ensuring a rich tapestry of wisdom.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-soft-peach">
            Our Commitment to Quality
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            We are dedicated to providing a clean, aesthetic, and user-friendly
            experience that allows visitors to discover inspiration
            effortlessly. Our collection grows continuously as we seek out
            meaningful contributions from thinkers, writers, and visionaries
            across generations. Every quote undergoes careful review to ensure
            it meets our standards for authenticity, relevance, and inspirational value.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            Quality is at the heart of everything we do. We understand that our readers
            come to us seeking genuine wisdom and meaningful content. That&apos;s why we
            invest significant time in curating, organizing, and presenting quotes in a
            way that maximizes their impact and accessibility. Our website is designed
            to be fast, responsive, and enjoyable to use across all devices.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-soft-peach">
            Who We Serve
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            Echoes of Mahajan serves a global community of individuals seeking inspiration,
            motivation, and wisdom. Our readers include students preparing for exams,
            professionals navigating career challenges, artists seeking creative inspiration,
            and anyone on a journey of personal growth and self-discovery. We welcome
            people from all walks of life, cultures, and backgrounds.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-soft-peach">
            Join Our Community
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            Whether you&apos;re seeking daily inspiration, looking for the
            perfect quote to share with loved ones, or simply exploring the beauty
            of language and human wisdom, Mahajan&apos;s Quotes welcomes you to our
            growing community of thoughtful readers and wisdom seekers. Share your
            favorite quotes, explore new categories, and let our collection become
            part of your daily inspiration routine.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            Connect with us, share feedback, and help us grow this collection of wisdom.
            Together, we can create a space where inspiration flows freely and positive
            change begins with powerful words.
          </p>
        </div>
      </div>
    </div>
  );
}
