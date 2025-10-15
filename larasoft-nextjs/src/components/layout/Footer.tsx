// src/components/Footer.tsx

import { getAcfOptions } from "@/lib/wordpress";

export default async function Footer() {
    const siteOptions = await getAcfOptions();
    
    // Get the current year automatically
    const currentYear = new Date().getFullYear();
    
    // Replace a placeholder like {year} with the current year
    const copyrightText = siteOptions?.copyright_text?.replace('{year}', currentYear.toString()) 
                        || `Copyright © ${currentYear} LaraSoft. All Rights Reserved.`;

    return (
        <footer className="bg-background/80 border-t border-primary/20 text-text/60">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm">
                <p>{copyrightText}</p>
            </div>
        </footer>
    );
}