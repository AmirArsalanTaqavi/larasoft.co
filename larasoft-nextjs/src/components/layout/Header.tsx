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
          rounded-full shadow-lg bg-primary/20
          backdrop-blur-xl backdrop-saturate-150" // <-- FIX: Added dark inner shadow
        >
          <Navbar menuItems={menuItems} siteOptions={siteOptions} />
        </header>
    );
}