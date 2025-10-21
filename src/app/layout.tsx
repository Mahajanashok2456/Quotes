import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cookie, Homemade_Apple } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import AdminLoginModal from "./components/AdminLoginModal";

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
  description: "A collection of wisdom from great minds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>❤️</text></svg>"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cookie.variable} ${homemadeApple.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="overlay"></div>
        <Providers>
          {children}
        </Providers>
        <AdminLoginModal />
      </body>
    </html>
  );
}