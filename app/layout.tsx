import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NavbarClient from './navbar-client';
import { ScrollProvider } from '@/components/scroll-context';
import { getAcfOptions, getPostList, getServiceList } from '@/lib/wordpress';
import Background from '@/components/background';
import { StructuredData } from '@/components/structured-data';
import { GoogleAnalytics } from '@next/third-parties/google';
import { GrainOverlay } from '@/components/grain-overlay';

const vazirmatn = localFont({
  src: './fonts/vazirmatn.woff2',
  variable: '--font-vazirmatn',
  weight: '100 900',
});

const delnia = localFont({
  src: './fonts/delnia.woff2',
  variable: '--font-delnia',
  weight: '100 900',
});

const spaceGrotesk = localFont({
  src: './fonts/spacegrotesk.ttf',
  variable: '--font-space',
  weight: '300 700',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

export async function generateMetadata(): Promise<Metadata> {
  const options = await getAcfOptions();

  const siteTitle = options?.site_title || 'LaraSoft | Digital Agency';
  const siteDescription =
    options?.site_description ||
    'LaraSoft - IT Network Support & Web Development Agency';
  const siteUrl = 'https://larasoft.co';

  // Helper to handle the string | object structure from ACF
  const resolveUrl = (img: any) => (typeof img === 'string' ? img : img?.url);

  const faviconUrl = resolveUrl(options?.favicon) || '/favicon.ico';
  const ogImageUrl = resolveUrl(options?.og_image) || '/og-image.jpg';
  const appleIconUrl = resolveUrl(options?.apple_icon) || '/apple-icon.png';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteTitle,
      template: `%s | LaraSoft`,
    },
    description: siteDescription,
    applicationName: 'LaraSoft',
    authors: [{ name: 'LaraSoft Team', url: siteUrl }],
    generator: 'Next.js',
    keywords: [
      'IT Support',
      'Network Services',
      'Web Development',
      'Cybersecurity',
      'Tehran',
      'LaraSoft',
    ],
    referrer: 'origin-when-cross-origin',
    creator: 'Amir Arsalan Taqavi',
    publisher: 'LaraSoft',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: faviconUrl },
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      shortcut: [faviconUrl],
      apple: [{ url: appleIconUrl, sizes: '180x180', type: 'image/png' }],
      other: [
        {
          rel: 'apple-touch-icon-precomposed',
          url: appleIconUrl,
        },
      ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: siteUrl,
      siteName: 'LaraSoft',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
      locale: 'fa_IR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [ogImageUrl],
      creator: '@larasoft_co',
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch normalized data
  const [menuServices, menuPosts] = await Promise.all([
    getServiceList(4),
    getPostList(4),
  ]);

  const gaId = process.env.NEXT_PUBLIC_GA_ID || '';

  return (
    <html lang='fa' dir='rtl' suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} ${delnia.variable} ${spaceGrotesk.variable} bg-background text-foreground selection:bg-accent overflow-x-hidden antialiased selection:text-black`}
      >
        <StructuredData />
        <ScrollProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <ScrollProvider>
              <Background />
              <GrainOverlay />
              <NavbarClient services={menuServices} posts={menuPosts} />
              {children}
            </ScrollProvider>
          </ThemeProvider>
        </ScrollProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
