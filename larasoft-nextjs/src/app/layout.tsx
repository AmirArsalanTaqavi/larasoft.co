// src/app/layout.tsx

import './globals.css';

import { getAcfOptions } from '@/lib/wordpress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const siteOptions = await getAcfOptions();

  const siteTitle = 'لاراسافت'; // Fallback
  const siteDesc = 'LaraSoft IT Solutions'; // Fallback
  const siteLogo = siteOptions?.site_logo?.url || '';

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDesc,
    openGraph: {
      title: siteTitle,
      description: siteDesc,
      images: [
        {
          url: siteLogo,
          width: 112,
          height: 32,
        },
      ],
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteOptions = await getAcfOptions();

  const colorVariables = {
    '--color-primary': siteOptions?.color_primary || '#007BFF',
    '--color-secondary': siteOptions?.color_secondary || '#6C757D',
    '--color-accent': siteOptions?.color_accent || '#17A2B8',
    '--color-text': siteOptions?.color_text || '#F8F9FA',
    '--color-background': siteOptions?.color_background || '#002924',
    '--color-surface': siteOptions?.color_surface || '#003a34',
  } as React.CSSProperties;

  return (
    <html 
      lang="fa" 
      dir="rtl" 
      className={`font-vazirmatn`} style={colorVariables}
    >
      <head>
        {siteOptions?.favicon?.url && <link rel="icon" href={siteOptions.favicon.url} sizes="any" />}
      </head>
      
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}