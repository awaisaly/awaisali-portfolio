import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://awaisali-portfolio.vercel.app",
  ),
  title: {
    default: "Awais Ali — Senior Software Engineer",
    template: "%s — Awais Ali",
  },
  description:
    "Awais Ali is a Senior Software Engineer with 8+ years of experience building scalable web applications. Remote-first with extensive experience working with distributed teams across time zones.",
  applicationName: "Awais Ali Portfolio",
  authors: [{ name: "Awais Ali" }],
  creator: "Awais Ali",
  publisher: "Awais Ali",
  keywords: [
    "Awais Ali",
    "Senior Software Engineer",
    "Senior Frontend Engineer",
    "Remote Software Engineer",
    "Remote Frontend Engineer",
    "Remote work",
    "Distributed teams",
    "React",
    "TypeScript",
    "Next.js",
    "Redux",
    "Electron",
    "POS",
    "Stripe",
    "Islamabad",
    "Remote",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Awais Ali — Senior Software Engineer",
    description:
      "Senior Software Engineer with 8+ years of experience. Remote-first, experienced with distributed teams building scalable web applications.",
    siteName: "Awais Ali Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Awais Ali — Senior Software Engineer (Remote-first)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Awais Ali — Senior Software Engineer",
    description:
      "Senior Software Engineer with 8+ years of experience. Remote-first, experienced with distributed teams building scalable web applications.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
