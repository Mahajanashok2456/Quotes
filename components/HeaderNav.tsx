"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Categories", href: "/categories" },
    { name: "FAQ", href: "/faq" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 shadow-lg"
      style={{
        background: "linear-gradient(to right, #4A00E0, #8E2DE2)",
        margin: 0,
        padding: 0,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      <nav className="container mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
        <div className="flex items-center justify-between h-auto min-h-[48px] relative overflow-hidden">
          {/* Left side: Logo and Desktop Navigation */}
          <div className="flex items-center gap-4 lg:gap-6 xl:gap-8">
            {/* Logo/Brand */}
            <div className="flex justify-start min-w-0 flex-shrink-0">
              <Link
                href="/"
                className="text-white font-cursive text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold tracking-wide hover:opacity-90 transition-opacity duration-300 whitespace-nowrap block"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Echoes of Mahajan
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    relative px-2 lg:px-4 py-2 text-white font-medium text-xs lg:text-sm xl:text-base
                    transition-all duration-300 ease-in-out
                    hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]
                    group
                    ${
                      isActive(link.href)
                        ? "text-white font-semibold"
                        : "text-white/90"
                    }
                  `}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {link.name}
                  <span
                    className={`
                      absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-white
                      transition-all duration-300 ease-in-out
                      ${
                        isActive(link.href)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button with divider */}
          <div className="lg:hidden flex items-center flex-shrink-0">
            <div className="flex-1 border-t border-white/30 mx-4"></div>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 transition-colors duration-200 min-h-[44px] min-w-[44px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-3 pt-2 space-y-1 border-t border-white/20 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  block px-4 py-2 text-white font-medium text-sm sm:text-base
                  transition-all duration-200 rounded-md
                  hover:bg-white/10 hover:pl-6
                  ${
                    isActive(link.href)
                      ? "bg-white/20 font-semibold"
                      : "text-white/90"
                  }
                `}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
