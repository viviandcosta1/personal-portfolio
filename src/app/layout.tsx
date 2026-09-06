import type { Metadata, Viewport } from 'next';
import { Inter, Chakra_Petch } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const chakraPetch = Chakra_Petch({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vivian Dcosta — Software Developer | AI/ML & Full-Stack Developer',
  description:
    'Portfolio of Vivian Dcosta, Software Developer and AI/ML Developer building modern web applications, AI-powered solutions, automation workflows and full-stack products.',
  keywords: [
    'Vivian Dcosta',
    'Software Developer',
    'AI/ML Developer',
    'Full-Stack Developer',
    'React.js',
    'Node.js',
    'Python',
    'FastAPI',
    'MongoDB',
    'AWS',
    'Portfolio',
    'Football Game Portfolio',
    'Three.js Portfolio',
  ],
  authors: [{ name: 'Vivian Dcosta', url: 'https://viviandcosta.dev' }],
  creator: 'Vivian Dcosta',
  metadataBase: new URL('https://viviandcosta.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vivian Dcosta — Software Developer | AI/ML & Full-Stack Developer',
    description:
      'Immersive 3D Football Stadium Developer Portfolio of Vivian Dcosta. Explore full-stack applications, AI/ML pipelines, and software engineering.',
    url: 'https://viviandcosta.dev',
    siteName: 'Vivian Dcosta Portfolio Arena',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivian Dcosta — Software Developer | AI/ML & Full-Stack Developer',
    description:
      'Immersive 3D Football Stadium Developer Portfolio of Vivian Dcosta.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#040609',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vivian Dcosta',
    jobTitle: 'Software Developer & AI/ML Developer',
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
      'Full-Stack Development',
      'Machine Learning',
      'React.js',
      'Node.js',
      'FastAPI',
      'Python',
      'MongoDB',
      'AWS',
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${chakraPetch.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#040609] text-white font-sans selection:bg-[#00ff87] selection:text-black">
        {children}
      </body>
    </html>
  );
}
