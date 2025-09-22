import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Your Name - Full Stack Developer",
  description: "Full Stack Developer passionate about creating beautiful, functional, and user-centered digital experiences.",
  keywords: ["developer", "portfolio", "web development", "react", "nextjs", "typescript"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "Your Name - Full Stack Developer",
    description: "Full Stack Developer passionate about creating beautiful, functional, and user-centered digital experiences.",
    siteName: "Your Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Full Stack Developer",
    description: "Full Stack Developer passionate about creating beautiful, functional, and user-centered digital experiences.",
    creator: "@yourusername",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
