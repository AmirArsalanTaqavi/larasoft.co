// src/app/layout.tsx

import './globals.css';
import { getAcfOptions } from '@/lib/wordpress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { vazirmatn } from './fonts'; // Import our local font

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteOptions = await getAcfOptions();

  // Define all our color variables in one place
  const colorVariables = {
    '--color-primary': siteOptions?.color_primary || '#000000',
    '--color-secondary': siteOptions?.color_secondary || '#000000',
    '--color-accent': siteOptions?.color_accent || '#00ff00',
    '--color-text': siteOptions?.color_text || '#ffffff',
    '--color-background': siteOptions?.color_background || '#1a1a1a',
    '--color-surface': siteOptions?.color_surface || '#2a2a2a',
  } as React.CSSProperties;

  return (
    // Apply BOTH the font class AND the color styles to the root <html> tag
    // - `vazirmatn.variable` creates the `--font-vazirmatn` variable
    // - `font-sans` tells Tailwind to use our `fontFamily.sans` (which references the variable)
    <html lang="en" className={`${vazirmatn.variable} font-sans`} style={colorVariables}>
      <head>
        {siteOptions?.favicon?.url && <link rel="icon" href={siteOptions.favicon.url} sizes="any" />}
      </head>
      
      {/* The body tag is now clean and will inherit everything */}
      <body>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}