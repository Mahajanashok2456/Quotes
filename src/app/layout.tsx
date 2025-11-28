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
  metadataBase: new URL("https://echoesofmahajan.vercel.app"),
  title: {
    default: "Echoes of Mahajan | Inspirational Quotes, Poetry & Life Wisdom",
    template: "%s | Echoes of Mahajan",
  },
  description:
    "Discover deeply aesthetic and inspiring quotes, poetry, and thoughts at Echoes of Mahajan. Daily inspiration, motivational wisdom, and beautiful words to brighten your day. Explore curated collections of quotes on love, success, motivation, and personal growth.",
  keywords: [
    "echoes of mahajan",
    "inspirational quotes",
    "motivational quotes",
    "life wisdom",
    "poetry",
    "daily inspiration",
    "aesthetic quotes",
    "wisdom quotes",
    "success quotes",
    "love quotes",
    "personal growth",
    "mahajan quotes",
  ],
  authors: [{ name: "Mahajan", url: "https://echoesofmahajan.vercel.app" }],
  creator: "Mahajan",
  publisher: "Echoes of Mahajan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://echoesofmahajan.vercel.app",
    siteName: "Echoes of Mahajan",
    title: "Echoes of Mahajan | Inspirational Quotes, Poetry & Life Wisdom",
    description:
      "Discover deeply aesthetic and inspiring quotes, poetry, and thoughts. Daily inspiration, motivational wisdom, and beautiful words to brighten your day.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Echoes of Mahajan - Inspirational Quotes and Wisdom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Echoes of Mahajan | Inspirational Quotes & Life Wisdom",
    description:
      "Discover deeply aesthetic and inspiring quotes, poetry, and thoughts. Daily inspiration and motivational wisdom.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://echoesofmahajan.vercel.app",
  },
  verification: {
    google: "J0w54eoOuewY25381lOzMlB_okjRWCrCro8yJa-JhRM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="J0w54eoOuewY25381lOzMlB_okjRWCrCro8yJa-JhRM"
        />

        {/* Structured Data (JSON-LD) for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Echoes of Mahajan",
              alternateName: ["Echoes Mahajan", "Mahajan Quotes"],
              url: "https://echoesofmahajan.vercel.app",
              description:
                "Discover deeply aesthetic and inspiring quotes, poetry, and thoughts. Find motivation, wisdom, and beautiful words to brighten your day.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://echoesofmahajan.vercel.app/?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "Echoes of Mahajan",
                logo: {
                  "@type": "ImageObject",
                  url: "https://echoesofmahajan.vercel.app/og-image.jpg",
                },
              },
            }),
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NLSLPLH4');
            `,
          }}
        />
        {/* End Google Tag Manager */}

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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLSLPLH4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
