import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-6 sm:py-8 bg-gray-900/95 backdrop-blur-sm mt-8 border-t border-purple-500/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Explore Section */}
          <div className="text-left">
            <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Explore
            </h3>
            <div className="space-y-2">
              <Link
                href="/blog"
                className="block text-xs sm:text-sm text-gray-300 hover:text-purple-400 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/categories"
                className="block text-xs sm:text-sm text-gray-300 hover:text-purple-400 transition-colors"
              >
                Categories
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div className="text-left">
            <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Support
            </h3>
            <div className="space-y-2">
              <Link
                href="/faq"
                className="block text-xs sm:text-sm text-gray-300 hover:text-purple-400 transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/resources"
                className="block text-xs sm:text-sm text-gray-300 hover:text-purple-400 transition-colors"
              >
                Resources
              </Link>
            </div>
          </div>

          {/* Company Section */}
          <div className="text-left">
            <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Company
            </h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-xs sm:text-sm text-gray-300 hover:text-purple-400 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-xs sm:text-sm text-gray-300 hover:text-purple-400 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Legal Section */}
          <div className="text-left">
            <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Legal
            </h3>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block text-xs sm:text-sm text-gray-300 hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-xs sm:text-sm text-gray-300 hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-purple-500/30 pt-4 sm:pt-6">
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Echoes of Mahajan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
