import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-background text-text shadow-lg"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* LaraSoft Branding/Logo */}
        <Link href="/" className="text-3xl font-extrabold tracking-wider hover:text-indigo-200 transition-colors">
          LaraSoft
        </Link>
        
        {/* Navigation Links */}
        <nav className="flex space-x-6 text-xl">
          <Link href="/" className="hover:text-indigo-200 transition-colors">
            صفحه اصلی
          </Link>
          <Link href="/about" className="hover:text-indigo-200 transition-colors">
            درباره ما
          </Link>
          <Link href="/contact" className="hover:bg-indigo-700 bg-indigo-600 px-4 py-2 rounded-lg transition-colors">
            تماس با ما
          </Link>
        </nav>
      </div>
    </header>
  );
}