import Link from 'next/link';

// Inside src/components/layout/Header.tsx
// ...
export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 text-text shadow-lg
                       bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 
                      flex justify-between items-center transition-colors">
        
        {/* LaraSoft Branding/Logo */}
        <Link href="/" className="text-3xl font-extrabold tracking-wider 
                                  text-accent hover:text-text transition-colors">
          LaraSoft
        </Link>
        
        {/* Navigation Links */}
        <nav className="flex space-x-6 space-x-reverse text-xl">
          <Link href="/" className="hover:text-accent transition-colors">
            صفحه اصلی
          </Link>
          <Link href="/about" className="hover:text-accent transition-colors">
            درباره ما
          </Link>
          <Link href="/contact" className="hover:bg-primary/90 bg-primary 
                                           px-4 py-2 rounded-lg transition-colors">
            تماس با ما
          </Link>
        </nav>
      </div>
    </header>
  );
}