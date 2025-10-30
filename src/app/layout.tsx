import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cookie, Homemade_Apple } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import Providers from "./Providers";
import AdminLoginModal from "./components/AdminLoginModal";
import HeaderNav from "../../components/HeaderNav";

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
  description:
    "A curated collection of deeply aesthetic and inspiring quotes, poetry, and thoughts. Find your next moment of motivation or a perfect quote for sharing on social media.",
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
          crossOrigin="anonymous"
        ></script>
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
        style={{ margin: 0, padding: 0 }}
      >
        <HeaderNav />
        <div className="overlay"></div>
        <Providers>{children}</Providers>
        <footer className="text-center py-6 bg-gray-100 dark:bg-gray-800 mt-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Explore
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/blog"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/categories"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Categories
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Support
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/faq"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/resources"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Resources
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Company
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/about"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Legal
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/privacy"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 Echoes of Mahajan. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        <AdminLoginModal />
      </body>
    </html>
  );
}
