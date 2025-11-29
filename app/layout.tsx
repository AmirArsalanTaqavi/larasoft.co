import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NavbarClient from './navbar-client';
import { ScrollProvider } from '@/components/scroll-context';
import { getAcfOptions } from '@/lib/wordpress';
import { GoogleAnalytics } from '@next/third-parties/google';

import { StructuredData } from '@/components/structured-data';
import { GrainOverlay } from '@/components/grain-overlay';
import { CustomCursor } from '@/components/custom-cursor';
import Background from '@/components/background';

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const options = await getAcfOptions();

  return (
    <html lang='fa' dir='rtl' suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} ${larasoftFont.variable} ${spaceFont.variable} bg-background text-foreground selection:bg-accent overflow-x-hidden antialiased selection:text-black`}
      >
        <StructuredData /> {/* <--- ADD THIS HERE */}
        <ScrollProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <ScrollProvider>
              <GrainOverlay />
              <Background />
              <NavbarClient menuItems={[]} />
              {children}
            </ScrollProvider>
          </ThemeProvider>
        </ScrollProvider>
      </body>
      <GoogleAnalytics gaId='G-XYZ123456' />
    </html>
  );
}
