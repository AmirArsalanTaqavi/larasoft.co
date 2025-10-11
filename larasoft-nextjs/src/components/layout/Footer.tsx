import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Section: Quick Links & Social */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          
          {/* 1. Services Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-indigo-400">خدمات لارا سافت</h4>
            <ul className="space-y-2 text-right">
              {/* NOTE: These links should be generated dynamically from getPages() for production */}
              <li><Link href="/services/network-support" className="hover:text-indigo-200">پشتیبانی شبکه</Link></li>
              <li><Link href="/services/web-development" className="hover:text-indigo-200">طراحی وب</Link></li>
              <li><Link href="/services/cybersecurity" className="hover:text-indigo-200">امنیت سایبری</Link></li>
            </ul>
          </div>
          
          {/* 2. Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-indigo-400">لینک‌های سریع</h4>
            <ul className="space-y-2 text-right">
              <li><Link href="/about" className="hover:text-indigo-200">درباره ما</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-200">تماس با ما</Link></li>
              <li><Link href="/post/hello-world" className="hover:text-indigo-200">آخرین مقاله</Link></li>
            </ul>
          </div>

          {/* 3. Partner / Spouse Brand Link */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xl font-semibold mb-4 text-indigo-400">برندهای همکار</h4>
            <ul className="space-y-2 text-right">
              <li>
                <a href="https://instagram.com/Jute_gallery" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
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