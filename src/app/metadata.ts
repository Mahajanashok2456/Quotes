import type { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: "Echoes of Mahajan | Inspirational Quotes & Wisdom",
  description:
    "Echoes of Mahajan - Discover deeply aesthetic and inspiring quotes, poetry, and thoughts. Find motivation, wisdom, and beautiful words to brighten your day. Daily inspirational quotes and life wisdom.",
  keywords:
    "echoes of mahajan, mahajan quotes, echoes mahajan, quotes, inspiration, motivation, wisdom, poetry, thoughts, aesthetic quotes, daily inspiration, motivational quotes, life wisdom, inspirational thoughts",
  openGraph: {
    title: "Echoes of Mahajan | Inspirational Quotes & Wisdom",
    description:
      "Echoes of Mahajan - Discover deeply aesthetic and inspiring quotes, poetry, and thoughts. Find motivation, wisdom, and beautiful words to brighten your day.",
    type: "website",
    url: "https://echoesofmahajan.vercel.app/",
    siteName: "Echoes of Mahajan",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Echoes of Mahajan - Inspirational Quotes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Echoes of Mahajan | Inspirational Quotes & Wisdom",
    description:
      "Echoes of Mahajan - Discover deeply aesthetic and inspiring quotes, poetry, and thoughts. Find motivation, wisdom, and beautiful words to brighten your day.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://echoesofmahajan.vercel.app/",
  },
};
