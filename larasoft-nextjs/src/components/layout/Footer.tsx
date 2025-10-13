import Link from 'next/link';

// Inside src/components/layout/Footer.tsx
// ...
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-text shadow-inner border-t border-primary mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Section: Quick Links & Social */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-primary/50 pb-8 mb-8">
          
          {/* 1. Services Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-primary">خدمات لارا سافت</h4>
            <ul className="space-y-2 text-right">
              {/* NOTE: Add your newly planned links here */}
              <li><Link href="/services/network-support" className="hover:text-accent transition-colors">پشتیبانی شبکه</Link></li>
              <li><Link href="/services/web-development" className="hover:text-accent transition-colors">طراحی وب</Link></li>
              <li><Link href="/services/hosting-domain" className="hover:text-accent transition-colors">هاستینگ و دامنه</Link></li>
              <li><Link href="/services/cybersecurity" className="hover:text-accent transition-colors">امنیت سایبری</Link></li>
            </ul>
          </div>
          
          {/* 2. Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-primary">لینک‌های سریع</h4>
            <ul className="space-y-2 text-right">
              <li><Link href="/about" className="hover:text-accent transition-colors">درباره ما</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">تماس با ما</Link></li>
              <li><Link href="/post/latest-article-slug" className="hover:text-accent transition-colors">آخرین مقاله</Link></li>
            </ul>
          </div>

          {/* 3. Partner / Spouse Brand Link (Sara's Gallery) */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xl font-semibold mb-4 text-primary">برندهای همکار</h4>
            <ul className="space-y-2 text-right">
              <li>
                <a href="https://instagram.com/Jute_gallery" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-text transition-colors">
                  Jute_gallery (هنر مینیاتور) &rarr;
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Section: Copyright and IT Admin Mention */}
        <div className="text-center md:flex md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 mb-2 md:mb-0">
            © {currentYear} LaraSoft. تمامی حقوق محفوظ است.
          </p>
          <p className="order-1">
            IT Network Support & Web Development Services.
          </p>
        </div>
      </div>
    </footer>
  );
}