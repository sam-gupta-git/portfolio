import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Michroma } from "next/font/google";
import "./globals.css";

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
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

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef1f3" },
    { media: "(prefers-color-scheme: dark)", color: "#121719" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${michroma.variable} ${plexMono.variable} ${plexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
