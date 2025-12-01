import Link from 'next/link';
import { LogoInline, Pattern } from '@/components/svgs';
import { MagneticButton } from '@/components/magnetic-button';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    // Changed:
    // 1. bg-background -> bg-transparent (so we can layer manually)
    // 2. We add a manual background div behind the pattern so the pattern sits ON TOP of the black bg
    <footer className='relative overflow-hidden border-t border-foreground/10 bg-transparent pt-16 pb-8'>
      
      {/* Background Color Layer (Bottom) */}
      <div className="absolute inset-0 bg-background left-0 -z-20" />

      {/* Pattern Layer (Middle) - Adjusted opacity for better visibility */}
      <Pattern className="text-accent items-center opacity-30  -z-10" />

      {/* Content Layer (Top) */}
      <div className='relative z-10 mx-auto max-w-7xl px-6 md:px-12'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-24'>
          {/* Brand Column */}
          <div className='col-span-1 md:col-span-2'>
            <Link href='/' className='mb-6 block w-fit'>
              <LogoInline className='h-8 w-auto text-foreground transition-colors hover:text-accent' />
            </Link>
            <p className='mb-8 max-w-sm font-vazirmatn text-sm leading-loose text-foreground/60'>
              تلفیق هنر و تکنولوژی برای ساخت آینده دیجیتال.
              <br />
              ارائه دهنده خدمات تخصصی شبکه، امنیت و توسعه نرم‌افزار.
            </p>
            <div className='flex gap-4'>
              {/* Social Icons */}
              {['Instagram', 'LinkedIn', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href='#'
                  className='font-space text-xs text-foreground/40 transition-colors hover:text-accent'
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='col-span-1'>
            <h3 className='mb-6 font-vazirmatn text-lg font-bold text-foreground'>
              دسترسی سریع
            </h3>
            <ul className='space-y-4 font-vazirmatn text-sm text-foreground/60'>
              <li>
                <Link
                  href='/services'
                  className='transition-colors hover:text-accent'
                >
                  سرویس‌ها
                </Link>
              </li>
              <li>
                <Link
                  href='/posts'
                  className='transition-colors hover:text-accent'
                >
                  وبلاگ و مقالات
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='transition-colors hover:text-accent'
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='transition-colors hover:text-accent'
                >
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='col-span-1'>
            <h3 className='mb-6 font-vazirmatn text-lg font-bold text-foreground'>
              تماس
            </h3>
            <ul className='space-y-4 font-space text-sm text-foreground/60'>
              <li>
                <span className='block font-vazirmatn text-xs opacity-50'>
                  ایمیل:
                </span>
                info@larasoft.co
              </li>
              <li>
                <span className='block font-vazirmatn text-xs opacity-50'>
                  آدرس:
                </span>
                Tehran, Ferdowsi Sq.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-16 flex flex-col items-center justify-between border-t border-foreground/5 pt-8 md:flex-row'>
          <p className='font-space text-xs text-foreground/30'>
            © {currentYear} LaraSoft. All rights reserved.
          </p>
          <div className='mt-4 flex gap-6 font-vazirmatn text-xs text-foreground/30 md:mt-0'>
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