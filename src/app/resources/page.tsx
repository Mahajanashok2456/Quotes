import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title:
    "Inspirational Resources & Tools for Personal Growth | Echoes of Mahajan",
  description:
    "Discover curated inspirational resources including books, meditation apps, journaling tools, personal development courses, and related websites to enhance your personal growth journey.",
  keywords:
    "inspirational resources, personal development, meditation apps, journaling tools, self-help books, motivation, mindfulness, self-improvement",
  openGraph: {
    title: "Inspirational Resources & Tools for Personal Growth",
    description:
      "Discover curated inspirational resources including books, meditation apps, journaling tools, personal development courses, and related websites.",
    type: "website",
    url: "https://echoesofmahajan.vercel.app/resources",
    siteName: "Echoes of Mahajan",
  },
  twitter: {
    card: "summary",
    title: "Inspirational Resources & Tools for Personal Growth",
    description:
      "Discover curated inspirational resources including books, meditation apps, journaling tools, personal development courses.",
  },
  alternates: {
    canonical: "https://echoesofmahajan.vercel.app/resources",
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
