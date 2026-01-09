import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sam Gupta | Software Developer",
  description: "Entry-level Software Developer with a B.S. in Computer Science and hands-on experience building full-stack web applications using Java, JavaScript, React, Spring Boot, and SQL.",
  keywords: ["Software Developer", "Full Stack", "React", "Java", "Spring Boot", "Austin", "Texas"],
  authors: [{ name: "Sam Gupta" }],
  openGraph: {
    title: "Sam Gupta | Software Developer",
    description: "Entry-level Software Developer building full-stack web applications",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
