import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cookie, Homemade_Apple } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import Providers from "./Providers";
import AdminLoginModal from "./components/AdminLoginModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cookie = Cookie({
  variable: "--font-cookie",
  subsets: ["latin"],
  weight: "400",
});

const homemadeApple = Homemade_Apple({
  variable: "--font-homemade-apple",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Echoes of Mahajan",
  description: "A curated collection of deeply aesthetic and inspiring quotes, poetry, and thoughts. Find your next moment of motivation or a perfect quote for sharing on social media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>❤️</text></svg>"
        />
        <meta name="google-adsense-account" content="ca-pub-9258915549707323" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9258915549707323"
          crossOrigin="anonymous">
        </script>
        {/* 1. The main G-Tag library script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-C4LQS50DD3"
        />

        {/* 2. The G-Tag initialization script */}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // START: Add the Consent Mode default settings
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied'
              });
              // END: Add the Consent Mode default settings

              gtag('config', 'G-C4LQS50DD3');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cookie.variable} ${homemadeApple.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="overlay"></div>
        <header className="bg-gradient-to-r from-purple-900 to-indigo-800 p-4 shadow-lg">
          <div className="container mx-auto">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-soft-peach transition-colors"
              style={{ fontFamily: 'var(--font-cookie)' }}
            >
              Echoes of Mahajan
            </Link>
          </div>
        </header>
        <Providers>
          {children}
        </Providers>
        <footer className="text-center py-4 bg-gray-100 dark:bg-gray-800 mt-8">
          <Link href="/about" className="mr-4 text-xs text-gray-500 hover:underline">About Us</Link>
          <Link href="/contact" className="mr-4 text-xs text-gray-500 hover:underline">Contact Us</Link>
          <Link href="/privacy" className="mr-4 text-xs text-gray-500 hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="text-xs text-gray-500 hover:underline">Terms of Service</Link>
        </footer>
        <AdminLoginModal />
      </body>
    </html>
  );
}