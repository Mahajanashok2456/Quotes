"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  customItems?: BreadcrumbItem[];
}

interface Category {
  name: string;
  slug: string;
}

interface BlogPost {
  title: string;
  slug: string;
}

export default function Breadcrumb({ customItems }: BreadcrumbProps) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Fetch categories and blogs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, blogsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/blogs"),
        ]);

        if (categoriesRes.ok) {
          const data = await categoriesRes.json();
          setCategories(data.data || []);
        }

        if (blogsRes.ok) {
          const data = await blogsRes.json();
          setBlogPosts(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch breadcrumb data:", error);
      }
    };

    fetchData();
  }, []);

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;

    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    if (pathSegments.length === 0) return breadcrumbs;

    const currentPath = `/${pathSegments.join("/")}`;

    // Handle different routes
    if (pathSegments[0] === "blog") {
      breadcrumbs.push({ label: "Blog", href: "/blog" });

      if (pathSegments.length > 1) {
        const postSlug = pathSegments[1];
        const post = blogPosts.find((p) => p.slug === postSlug);
        if (post) {
          breadcrumbs.push({
            label: post.title,
            href: `/blog/${postSlug}`,
            isActive: true,
          });
        }
      } else {
        breadcrumbs[breadcrumbs.length - 1].isActive = true;
      }
    } else if (pathSegments[0] === "categories") {
      breadcrumbs.push({ label: "Categories", href: "/categories" });

      if (pathSegments.length > 1) {
        const categorySlug = pathSegments[1];
        const category = categories.find((c) => c.slug === categorySlug);
        if (category) {
          breadcrumbs.push({
            label: category.name,
            href: `/categories/${categorySlug}`,
            isActive: true,
          });
        }
      } else {
        breadcrumbs[breadcrumbs.length - 1].isActive = true;
      }
    } else if (pathSegments[0] === "faq") {
      breadcrumbs.push({ label: "FAQ", href: "/faq", isActive: true });
    } else if (pathSegments[0] === "resources") {
      breadcrumbs.push({
        label: "Resources",
        href: "/resources",
        isActive: true,
      });
    } else if (pathSegments[0] === "about") {
      breadcrumbs.push({ label: "About", href: "/about", isActive: true });
    } else if (pathSegments[0] === "contact") {
      breadcrumbs.push({ label: "Contact", href: "/contact", isActive: true });
    } else if (pathSegments[0] === "privacy") {
      breadcrumbs.push({
        label: "Privacy Policy",
        href: "/privacy",
        isActive: true,
      });
    } else if (pathSegments[0] === "terms") {
      breadcrumbs.push({
        label: "Terms of Service",
        href: "/terms",
        isActive: true,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-slate-blue">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-2 text-slate-blue/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            {item.isActive ? (
              <span className="text-soft-peach font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-soft-peach transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
