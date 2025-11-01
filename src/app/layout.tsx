import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cookie, Homemade_Apple } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import Providers from "./Providers";
import AdminLoginModal from "./components/AdminLoginModal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <Header />
        <div className="overlay"></div>
        <Providers>{children}</Providers>
        <CookieBanner />
        {/* Modern Footer */}
        <Footer />
        <AdminLoginModal />
      </body>
    </html>
  );
}
