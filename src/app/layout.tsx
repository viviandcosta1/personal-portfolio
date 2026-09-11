import type { Metadata, Viewport } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Vivian D'costa — Software Developer · AI/ML · Full Stack",
  description:
    "Personal portfolio of Vivian D'costa. Software developer building web applications, AI-powered systems, and automation experiences with discipline and precision.",
  keywords: [
    'Vivian Dcosta',
    'Vivian D\'costa',
    'Software Developer',
    'AI/ML Developer',
    'Full Stack Developer',
    'React.js',
    'Next.js',
    'Python',
    'FastAPI',
    'Node.js',
    'MongoDB',
    'AWS',
    'Portfolio',
  ],
  authors: [{ name: "Vivian D'costa", url: 'https://viviandcosta.dev' }],
  creator: "Vivian D'costa",
  metadataBase: new URL('https://viviandcosta.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Vivian D'costa — Software Developer · AI/ML · Full Stack",
    description:
      "Explore the work of Vivian D'costa — software engineer crafting high-performance web systems, AI pipelines, and full-stack solutions.",
    url: 'https://viviandcosta.dev',
    siteName: "Vivian D'costa Portfolio",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vivian D'costa — Software Developer · AI/ML · Full Stack",
    description:
      "Software developer building web applications, AI-powered systems, and scalable full-stack products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F3EC',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: "Vivian D'costa",
    jobTitle: 'Software Developer & AI/ML Engineer',
    url: 'https://viviandcosta.dev',
    sameAs: [
      'https://github.com/vivian-dcosta',
      'https://linkedin.com/in/vivian-dcosta-a92548231',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Belagavi',
      addressRegion: 'Karnataka',
      addressCountry: 'India',
    },
    alumniOf: 'Srinivas University Institute of Technology',
    knowsAbout: [
      'Full-Stack Web Development',
      'AI & Machine Learning',
      'Python',
      'FastAPI',
      'React.js',
      'Node.js',
      'MongoDB',
      'MySQL',
      'AWS Cloud',
    ],
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#F7F3EC] text-[#2B211B] font-sans selection:bg-[#B89452] selection:text-[#FFFDF9] min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
