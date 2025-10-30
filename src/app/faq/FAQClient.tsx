'use client';

import Script from 'next/script';
import { useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';

const faqData = [
  {
    section: 'About Quotes & Inspiration',
    questions: [
      {
        question: 'What is Echoes of Mahajan?',
        answer: 'Echoes of Mahajan is a curated collection of deeply aesthetic and inspiring quotes, poetry, and thoughts designed to motivate and inspire readers worldwide.'
      },
      {
        question: 'How often is new content added?',
        answer: 'We continuously add new quotes and content as we discover meaningful contributions from thinkers, writers, and visionaries across generations.'
      },
      {
        question: 'Can I share quotes on social media?',
        answer: 'Absolutely! We encourage sharing quotes that resonate with you. Please credit the source when possible and link back to our site.'
      },
      {
        question: 'Are the quotes original or sourced from others?',
        answer: 'Our collection includes both original quotes and carefully curated selections from various authors, thinkers, and sources throughout history.'
      }
    ]
  },
  {
    section: 'How to Submit Quotes',
    questions: [
      {
        question: 'How can I submit a quote?',
        answer: 'You can submit quotes through our contact form or by emailing us directly. We review all submissions and may feature them on our site.'
      },
      {
        question: 'Are there requirements for quote submissions?',
        answer: 'Submitted quotes should be original, meaningful, and appropriate. We reserve the right to edit for clarity and length.'
      },
      {
        question: 'How long does the review process take?',
        answer: 'We typically review submissions within 1-2 weeks. Due to the volume of submissions, we may not be able to respond to every inquiry.'
      },
      {
        question: 'Can I submit quotes from other authors?',
        answer: 'Yes, but please ensure you have the right to share them and provide proper attribution. We prioritize original content and public domain works.'
      }
    ]
  },
  {
    section: 'Content Guidelines',
    questions: [
      {
        question: 'What types of content do you accept?',
        answer: 'We accept inspirational quotes, poetry, motivational thoughts, and wisdom from various cultures and time periods.'
      },
      {
        question: 'Are there any content restrictions?',
        answer: 'We do not accept content that is offensive, discriminatory, promotes harm, or violates copyright. All content must be appropriate for all ages.'
      },
      {
        question: 'How do you categorize quotes?',
        answer: 'Quotes are categorized by themes such as motivation, love, success, wisdom, personal growth, and more. We also have seasonal and topical categories.'
      },
      {
        question: 'Can I request specific categories?',
        answer: 'We welcome suggestions for new categories. If you have ideas for themes we haven\'t covered, please let us know through our contact form.'
      }
    ]
  },
  {
    section: 'Privacy & Data Usage',
    questions: [
      {
        question: 'How do you protect user privacy?',
        answer: 'We are committed to protecting your privacy. We only collect necessary information and never share personal data with third parties without consent.'
      },
      {
        question: 'What information do you collect?',
        answer: 'We may collect email addresses for newsletters, contact forms, and basic analytics data to improve our service. We do not sell or rent personal information.'
      },
      {
        question: 'Do you use cookies?',
        answer: 'Yes, we use cookies for essential functionality, analytics, and advertising. You can control cookie preferences through your browser settings.'
      },
      {
        question: 'How can I opt out of communications?',
        answer: 'You can unsubscribe from any communications at any time using the unsubscribe link in emails, or contact us directly to update your preferences.'
      }
    ]
  },
  {
    section: 'AdSense & Monetization',
    questions: [
      {
        question: 'Why do you show ads?',
        answer: 'Ads help us maintain and improve our service while keeping content free for users. We carefully select relevant, non-intrusive advertisements.'
      },
      {
        question: 'How does AdSense work on your site?',
        answer: 'We use Google AdSense to display targeted advertisements. These ads are based on general interests and browsing behavior, not personal information.'
      },
      {
        question: 'Can users disable ads?',
        answer: 'While we don\'t provide an ad-free option, users can use ad blockers. However, we kindly ask that you consider whitelisting our site to support our work.'
      },
      {
        question: 'Do ads affect site performance?',
        answer: 'We optimize ad placement to minimize impact on loading times and user experience. Our priority is providing a smooth, enjoyable browsing experience.'
      }
    ]
  },
  {
    section: 'Contact Information',
    questions: [
      {
        question: 'How can I contact you?',
        answer: 'You can reach us through our contact form, email us at ashoroshan78@gmail.com, or use the contact information provided on our contact page.'
      },
      {
        question: 'What is your response time?',
        answer: 'We typically respond to inquiries within 24-48 hours during business days. Response times may be longer during weekends or holidays.'
      },
      {
        question: 'Do you offer customer support?',
        answer: 'We provide support for general inquiries, content submissions, and technical issues. For complex issues, we may need additional time to investigate.'
      },
      {
        question: 'Can I follow you on social media?',
        answer: 'We are working on expanding our social media presence. For now, please check back later or contact us for updates on our social channels.'
      }
    ]
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.flatMap(section =>
    section.questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  )
};

export default function FAQClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleAccordion = (sectionIndex: number, questionIndex: number) => {
    const key = `${sectionIndex}-${questionIndex}`;
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFaqData = faqData.map(section => ({
    ...section,
    questions: section.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-deep-teal-900 via-slate-blue to-soft-peach text-light-cream p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb />

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center px-2"
            style={{ fontFamily: "var(--font-cookie)" }}
          >
            Frequently Asked Questions
          </h1>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-light-cream placeholder-light-cream/70 focus:outline-none focus:ring-2 focus:ring-soft-peach"
                aria-label="Search FAQs"
              />
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-6">
            {filteredFaqData.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white/10 backdrop-blur-lg rounded-lg p-4 sm:p-6 shadow-xl">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-soft-peach">
                  {section.section}
                </h2>
                <div className="space-y-3">
                  {section.questions.map((faq, questionIndex) => {
                    const key = `${sectionIndex}-${questionIndex}`;
                    const isExpanded = expandedItems.has(key);
                    return (
                      <div key={questionIndex} className="border-b border-white/20 last:border-b-0">
                        <button
                          onClick={() => toggleAccordion(sectionIndex, questionIndex)}
                          className="w-full text-left py-3 px-2 hover:bg-white/5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-soft-peach"
                          aria-expanded={isExpanded}
                          aria-controls={`faq-answer-${key}`}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-base sm:text-lg font-medium pr-4">
                              {faq.question}
                            </h3>
                            <span className="text-soft-peach text-xl flex-shrink-0">
                              {isExpanded ? '−' : '+'}
                            </span>
                          </div>
                        </button>
                        {isExpanded && (
                          <div
                            id={`faq-answer-${key}`}
                            className="pb-3 px-2 text-sm sm:text-base text-light-cream/90"
                          >
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form Integration */}
          <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-lg p-4 sm:p-6 md:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-soft-peach text-center">
              Still Have Questions?
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-6 text-center">
              Can't find what you're looking for? Get in touch with us directly.
            </p>
            <div className="text-center">
              <a
                href="/contact"
                className="inline-block bg-soft-peach text-deep-teal font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-soft-peach"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}