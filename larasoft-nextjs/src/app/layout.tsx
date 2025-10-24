// src/app/layout.tsx

import './globals.css';

import { getAcfOptions } from '@/lib/wordpress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/ThemeProvider';

const vazirmatn = localFont({
  src: '../assets/fonts/vazirmatn/Vazirmatn[wght].woff2',
  display: 'swap',
  variable: '--font-vazirmatn',
  weight: '100 900',
});

const larasoftFont = localFont({
  src: '../assets/fonts/Delnia/Delnia.woff2',
  display: 'swap',
  variable: '--font-larasoft',
});

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

  // THIS IS THE BIG CHANGE:
  // We NO LONGER need the 'colorVariables' object.
  // The colors are now hardcoded in globals.css.
  // We only need the body background image.
  
  const globalBgUrl = siteOptions?.background_image?.url;
  const bodyStyles: React.CSSProperties = {};
  if (globalBgUrl) {
    bodyStyles.backgroundImage = `url(${globalBgUrl})`;
    bodyStyles.backgroundSize = 'cover';
    bodyStyles.backgroundAttachment = 'fixed';
    bodyStyles.backgroundPosition = 'center';
    bodyStyles.backgroundRepeat = 'no-repeat';
  }

  return (
    <html 
      lang="fa" 
      dir="rtl" 
      // We removed the 'style={colorVariables}'
      className={`${vazirmatn.variable} ${larasoftFont.variable} font-vazirmatn`}
      suppressHydrationWarning
    >
      <head>
        {siteOptions?.favicon?.url && <link rel="icon" href={siteOptions.favicon.url} sizes="any" />}
      </head>
      
      <body style={bodyStyles}>
        {/* 9. THE FIX: Wrap everything in ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </ThemeProvider> 
      </body>
    </html>
  );
}