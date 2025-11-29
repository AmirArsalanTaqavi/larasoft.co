import Link from 'next/link';
import { LogoInline } from '@/components/svgs';
import { MagneticButton } from '@/components/magnetic-button';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-foreground/10 bg-background border-t pt-16 pb-8'>
      <div className='mx-auto max-w-7xl px-6 md:px-12'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-24'>
          {/* Brand Column */}
          <div className='col-span-1 md:col-span-2'>
            <Link href='/' className='mb-6 block w-fit'>
              <LogoInline className='text-foreground h-8 w-auto' />
            </Link>
            <p className='font-vazirmatn text-foreground/60 mb-8 max-w-sm text-sm leading-loose'>
              تلفیق هنر و تکنولوژی برای ساخت آینده دیجیتال.
              <br />
              ارائه دهنده خدمات تخصصی شبکه، امنیت و توسعه نرم‌افزار.
            </p>
            <div className='flex gap-4'>
              {/* Social Icons - You can replace these with actual SVG icons later */}
              {['Instagram', 'LinkedIn', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href='#'
                  className='font-space text-foreground/40 hover:text-accent text-xs transition-colors'
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='col-span-1'>
            <h3 className='font-vazirmatn text-foreground mb-6 text-lg font-bold'>
              دسترسی سریع
            </h3>
            <ul className='font-vazirmatn text-foreground/60 space-y-4 text-sm'>
              <li>
                <Link
                  href='/services'
                  className='hover:text-accent transition-colors'
                >
                  سرویس‌ها
                </Link>
              </li>
              <li>
                <Link
                  href='/posts'
                  className='hover:text-accent transition-colors'
                >
                  وبلاگ و مقالات
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='hover:text-accent transition-colors'
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-accent transition-colors'
                >
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='col-span-1'>
            <h3 className='font-vazirmatn text-foreground mb-6 text-lg font-bold'>
              تماس
            </h3>
            <ul className='font-space text-foreground/60 space-y-4 text-sm'>
              <li>
                <span className='font-vazirmatn block text-xs opacity-50'>
                  ایمیل:
                </span>
                info@larasoft.co
              </li>
              <li>
                <span className='font-vazirmatn block text-xs opacity-50'>
                  آدرس:
                </span>
                Tehran, Ferdowsi Sq.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-foreground/5 mt-16 flex flex-col items-center justify-between border-t pt-8 md:flex-row'>
          <p className='font-space text-foreground/30 text-xs'>
            © {currentYear} LaraSoft. All rights reserved.
          </p>
          <div className='font-vazirmatn text-foreground/30 mt-4 flex gap-6 text-xs md:mt-0'>
            <Link href='/privacy' className='hover:text-foreground/60'>
              حریم خصوصی
            </Link>
            <Link href='/terms' className='hover:text-foreground/60'>
              قوانین و مقررات
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
