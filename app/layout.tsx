import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const socialImageVersion = '20260405051524';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.awaisali.net'
  ),
  title: {
    default: 'Awais Ali — Senior Full Stack & GenAI Developer',
    template: '%s — Awais Ali',
  },
  description:
    'Awais Ali is a Senior Software Engineer with 10+ years of experience building scalable web apps, API-driven platforms, POS/payment systems, and AI-powered developer and knowledge tools.',
  applicationName: 'Awais Ali Portfolio',
  authors: [{ name: 'Awais Ali' }],
  creator: 'Awais Ali',
  publisher: 'Awais Ali',
  keywords: [
    'Awais Ali',
    'Senior Software Engineer',
    'Senior Full Stack Developer',
    'GenAI Developer',
    'Generative AI Developer',
    'AI Engineer',
    'LLM Developer',
    'Senior Frontend Engineer',
    'Full Stack Engineer',
    'Remote Software Engineer',
    'Remote Full Stack Engineer',
    'Senior React Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'Backend Developer',
    'JavaScript Developer',
    'Remote React Developer',
    'Remote Next.js Developer',
    'Remote TypeScript Developer',
    'Full Stack Developer',
    'Remote Full Stack Developer',
    'Nodejs',
    'GenAI',
    'Generative AI',
    'LLM applications',
    'AI developer tools',
    'Semantic search',
    'RAG',
    'AI agents',
    'Remote work',
    'Distributed teams',
    'React',
    'TypeScript',
    'Next.js',
    'Redux',
    'Node.js',
    'Electron',
    'POS',
    'Stripe',
    'Adyen',
    'Payment integrations',
    'POS systems',
    'Web applications',
    'Portfolio',
    'Islamabad',
    'Pakistan',
    'Remote',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Awais Ali — Senior Full Stack & GenAI Developer',
    description:
      'Senior Software Engineer building scalable apps, API-driven platforms, payments/POS systems, and practical AI tools.',
    siteName: 'Awais Ali Portfolio',
    images: [
      {
        url: `/opengraph-image?v=${socialImageVersion}`,
        width: 1200,
        height: 630,
        alt: 'Awais Ali — Senior Full Stack & GenAI Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awais Ali — Senior Full Stack & GenAI Developer',
    description:
      'Senior Software Engineer building scalable apps, API-driven platforms, payments/POS systems, and practical AI tools.',
    images: [`/twitter-image?v=${socialImageVersion}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
