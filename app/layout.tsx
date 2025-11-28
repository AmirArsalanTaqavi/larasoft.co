import type React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { getAcfOptions } from '@/lib/wordpress';
import { AppProviders } from './providers';
import './globals.css';
import Background from '@/components/background';
import { CustomCursor } from '@/components/custom-cursor';
import { GrainOverlay } from '@/components/grain-overlay';
import { ScrollProvider } from '@/components/scroll-context';
import Navbar from '@/components/ui/navbar';

const vazirmatn = localFont({
  src: './fonts/vazirmatn.woff2',
  display: 'swap',
  variable: '--font-vazirmatn',
  weight: '100 900',
});

const larasoftFont = localFont({
  src: './fonts/delnia.woff2',
  display: 'swap',
  variable: '--font-larasoft',
});
const spaceFont = localFont({
  src: './fonts/spacegrotesk.ttf',
  display: 'swap',
  variable: '--font-space',
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

  return (
    <html lang='fa' dir='rtl' suppressHydrationWarning>
      <head>
        {siteOptions?.favicon?.url && (
          <link rel='icon' href={siteOptions.favicon.url} sizes='any' />
        )}
      </head>
      <body className='h-dvh min-h-dvh'>
        <ScrollProvider>
          <Navbar />
          <Background />
          <GrainOverlay />
          <AppProviders>{children}</AppProviders>
        </ScrollProvider>
      </body>
    </html>
  );
}
