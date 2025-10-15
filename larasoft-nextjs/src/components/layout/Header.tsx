// src/components/Header.tsx

import Link from 'next/link';
import Image from 'next/image';
// Fetch both menu items and the custom ACF options
import { getMenuItems, getAcfOptions } from '@/lib/wordpress';

export default async function Header() {
    // Fetch both sets of data in parallel for efficiency
    const [menuItems, siteOptions] = await Promise.all([
        getMenuItems('primary-menu'),
        getAcfOptions()
    ]);

    const siteUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || '';
    
    return (
        <header className="fixed top-0 left-0 right-0 z-50 text-text shadow-xl bg-background/90 backdrop-blur-sm backdrop-saturate-150">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center transition-colors">
                
                {/* DYNAMIC LOGO SECTION */}
                <Link href="/" className="flex items-center text-accent hover:text-primary transition-colors">
                    {siteOptions?.site_logo?.url ? (
                        <Image 
                            src={siteOptions.site_logo.url} 
                            alt={siteOptions.site_logo.alt || 'LaraSoft Logo'}
                            width={140}
                            height={40}
                            priority
                            className="h-10 w-auto"
                        />
                    ) : (
                        // Fallback to text title if no logo is uploaded
                        <span className="text-3xl font-extrabold tracking-wider">
                            LaraSoft
                        </span>
                    )}
                </Link>
                
                {/* DYNAMIC NAVIGATION */}
                <nav className="flex items-center space-x-6 space-x-reverse text-lg font-medium">
                    {menuItems && menuItems.map(item => (
                        <Link 
                            key={item.ID} 
                            href={item.url.replace(siteUrl, '') || '/'}
                            className="hover:text-primary transition-colors p-2"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}