import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "../../../../components/Breadcrumb";
import AdSense from "../../../../components/AdSense";
import { ADSENSE_CONFIG } from "../../../lib/adsense";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";
import Quote from "@/models/Quote";
import CategoryQuotesClient from "./CategoryQuotesClient";
import CategorySidebar from "./CategorySidebar";

// Dynamic page that revalidates
export const dynamic = "force-dynamic";
export const revalidate = 0; // Always fetch fresh data

// Default color gradients for categories
const defaultColors: Record<string, string> = {
  motivation: "from-red-500 to-orange-500",
  love: "from-pink-500 to-rose-500",
  success: "from-green-500 to-emerald-500",
  wisdom: "from-blue-500 to-indigo-500",
  friendship: "from-yellow-500 to-amber-500",
  inspiration: "from-purple-500 to-violet-500",
  "personal-growth": "from-teal-500 to-cyan-500",
  "life-lessons": "from-gray-500 to-slate-500",
};

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Helper function to get category by slug
async function getCategoryBySlug(slug: string) {
  try {
    await connectToDatabase();
    const category = await Category.findOne({ slug }).lean();
    return category ? JSON.parse(JSON.stringify(category)) : null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

// Helper function to get quotes by category slug
async function getQuotesByCategory(slug: string) {
  try {
    await connectToDatabase();
    const category = await Category.findOne({ slug }).lean();
    if (!category) return [];

    const categoryData = category as any; // Type assertion for Mongoose lean()
    const quotes = await Quote.find({
      $or: [
        { category: categoryData._id },
        { categoryName: categoryData.name },
      ],
    })
      .sort({ is_pinned: -1, created_at: -1 })
      .lean();

    return JSON.parse(JSON.stringify(quotes));
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found - Echoes of Mahajan",
    };
  }

  const categoryName = category.name || categorySlug;
  const categoryDescription = `Explore inspiring ${categoryName.toLowerCase()} quotes`;

  return {
    title: `${categoryName} Quotes - Inspiration & Wisdom | Echoes of Mahajan`,
    description: `${categoryDescription}. Discover beautiful ${categoryName.toLowerCase()} quotes that inspire and motivate. Find the perfect words for your journey.`,
    keywords: `${categoryName.toLowerCase()} quotes, ${categoryName.toLowerCase()} inspiration, motivation, wisdom, life lessons`,
    openGraph: {
      title: `${categoryName} Quotes - Inspiration & Wisdom`,
      description: `${categoryDescription}. Discover beautiful ${categoryName.toLowerCase()} quotes that inspire and motivate.`,
      type: "website",
      url: `https://quotes-website-self.vercel.app/categories/${category.slug}`,
      siteName: "Echoes of Mahajan",
    },
    twitter: {
      card: "summary",
      title: `${categoryName} Quotes - Inspiration & Wisdom`,
      description: `${categoryDescription}. Discover beautiful ${categoryName.toLowerCase()} quotes that inspire and motivate.`,
    },
    alternates: {
      canonical: `https://quotes-website-self.vercel.app/categories/${category.slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).lean();
    return categories.map((category: any) => ({
      category: category.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  const quotes = await getQuotesByCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const categoryColor =
    defaultColors[category.slug] || "from-purple-500 to-indigo-500";
  const categoryName = category.name || categorySlug;

  return (
    <div className="min-h-screen text-foreground p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <Breadcrumb />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto mb-12">
        <div className="text-center py-8 md:py-16 max-w-4xl mx-auto">
          <div
            className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${categoryColor} text-white text-sm font-semibold mb-4`}
          >
            {categoryName} Category
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg bg-gradient-to-b from-purple-500 to-white bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-cookie)" }}
          >
            {categoryName} Quotes
          </h1>
          <p
            className="text-lg md:text-xl drop-shadow-lg text-light-cream max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-homemade-apple)" }}
          >
            Explore inspiring {categoryName.toLowerCase()} quotes
          </p>
        </div>
      </section>

      {/* Header Banner Ad */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-center">
          <AdSense
            adSlot={ADSENSE_CONFIG.adSlots.headerBanner}
            adFormat={ADSENSE_CONFIG.formats.header}
            className="mb-4"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Quotes Grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-soft-peach">
                {categoryName} Quotes
              </h2>
              <CategoryQuotesClient
                quotes={quotes}
                categoryName={categoryName}
              />
            </section>
          </div>

          {/* Sidebar */}
          <CategorySidebar />
        </div>
      </div>

      {/* Footer Banner Ad */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="flex justify-center">
          <AdSense
            adSlot={ADSENSE_CONFIG.adSlots.footerBanner}
            adFormat={ADSENSE_CONFIG.formats.footer}
            className="mb-8"
          />
        </div>
      </div>
    </div>
  );
}
