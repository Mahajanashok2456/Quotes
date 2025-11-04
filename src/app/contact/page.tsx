import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Echoes of Mahajan",
  description:
    "Get in touch with Echoes of Mahajan. We'd love to hear from you about quotes, inspiration, or any questions you have. Reach out via email for submissions or inquiries.",
  keywords:
    "contact us, email, quotes submission, inspiration, feedback, Echoes of Mahajan",
  openGraph: {
    title: "Contact Us - Echoes of Mahajan",
    description:
      "Get in touch with us. We'd love to hear your thoughts on quotes, inspiration, and personal growth.",
    type: "website",
    url: "https://echoesofmahajan.vercel.app/contact",
    siteName: "Echoes of Mahajan",
  },
  twitter: {
    card: "summary",
    title: "Contact Us - Echoes of Mahajan",
    description:
      "Get in touch with us. We'd love to hear your thoughts on quotes, inspiration, and personal growth.",
  },
  alternates: {
    canonical: "https://echoesofmahajan.vercel.app/contact",
  },
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-teal-900 via-slate-blue to-soft-peach text-light-cream p-4 sm:p-6 md:p-8 pt-20 sm:pt-24 lg:pt-28">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center px-2"
          style={{ fontFamily: "var(--font-cookie)" }}
        >
          Contact Us
        </h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 sm:p-6 md:p-8 shadow-xl text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-soft-peach">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 px-2">
            We&apos;d love to hear from you! Whether you have questions,
            suggestions, or just want to share your thoughts, feel free to reach
            out.
          </p>

          <div className="bg-white/5 rounded-lg p-4 sm:p-6 mx-auto max-w-md">
            <p className="text-lg sm:text-xl font-medium mb-2">Email Us At:</p>
            <a
              href="mailto:ashoroshan78@gmail.com"
              className="text-xl sm:text-2xl font-bold text-soft-peach hover:text-light-cream transition-colors underline break-all"
            >
              ashoroshan78@gmail.com
            </a>
          </div>

          <p className="text-xs sm:text-sm mt-6 sm:mt-8 text-light-cream/80 px-2">
            We typically respond within 24-48 hours. Thank you for your interest
            in Mahajan&apos;s Quotes!
          </p>
        </div>
      </div>
    </div>
  );
}
