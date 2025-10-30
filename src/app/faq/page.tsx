import { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Echoes of Mahajan',
  description: 'Find answers to common questions about quotes, inspiration, content submission, privacy, AdSense, and more. Get comprehensive help and guidance for using Echoes of Mahajan.',
  keywords: 'FAQ, frequently asked questions, quotes, inspiration, content submission, privacy policy, contact, AdSense, help',
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | Echoes of Mahajan',
    description: 'Find answers to common questions about quotes, inspiration, content submission, privacy, and more.',
    type: 'website',
    url: 'https://quotes-website-self.vercel.app/faq',
    siteName: 'Echoes of Mahajan',
  },
  twitter: {
    card: 'summary',
    title: 'FAQ - Frequently Asked Questions',
    description: 'Find answers to common questions about quotes, inspiration, content submission, privacy, and more.',
  },
  alternates: {
    canonical: 'https://quotes-website-self.vercel.app/faq',
  },
};

export default function FAQ() {
  return <FAQClient />;
}