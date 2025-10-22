// src/components/layout/Header.tsx
import { getMenuItems, getAcfOptions } from '@/lib/wordpress';
import Navbar from './Navbar';

export default async function Header() {
    const [menuItems, siteOptions] = await Promise.all([
        getMenuItems(2), // Calling with ID 2
        getAcfOptions()
    ]);

    return (
        <header 
          className="fixed top-4 left-1/2 z-50 
          w-[95%] max-w-6xl -translate-x-1/2
          rounded-full text-text-500 shadow-xl bg-primary-500/80 
          backdrop-blur-lg backdrop-saturate-150 
          shadow-inner shadow-black/20" // <-- FIX: Added dark inner shadow
        >
          <Navbar menuItems={menuItems} siteOptions={siteOptions} />
        </header>
    );
}