import React from 'react';
import Link from 'next/link';
import { getServiceList } from '@/lib/wordpress';
import { MagneticButton } from '@/components/magnetic-button';
import { Metadata } from 'next';
import DotPattern from '@/components/ui/dot-pattern';

export const metadata: Metadata = {
  title: 'سرویس‌ها | LaraSoft',
  description: 'خدمات حرفه‌ای فناوری اطلاعات، شبکه و برنامه‌نویسی',
};

// Revalidate every hour
export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getServiceList();

  return (
    <main className='min-h-screen w-full px-6 pt-32 pb-20 md:px-12'>
      <div className='relative mx-auto max-w-7xl'>
        {/* Header */}
        <div className='animate-in fade-in slide-in-from-bottom-4 mb-16 duration-700'>
          <h1 className='font-larasoft text-foreground mb-4 text-5xl md:text-7xl'>
            سرویس‌های ما
          </h1>
          <p className='font-vazirmatn text-foreground/60 max-w-2xl text-lg'>
            ما در لاراسافت مجموعه‌ای کامل از خدمات دیجیتال و زیرساخت را ارائه
            می‌دهیم تا کسب‌وکار شما بدون دغدغه رشد کند.
          </p>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className='group relative block'
            >
              <div
                className='border-foreground/10 bg-foreground/5 hover:border-accent/50 animate-in fade-in slide-in-from-bottom-8 h-full rounded-2xl border p-8 transition-colors duration-500'
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <DotPattern className='rounded-2xl' />
                <div className='mb-8 flex items-start justify-between'>
                  <span className='font-space text-foreground/20 group-hover:text-accent text-4xl transition-colors'>
                    {service.number}
                  </span>
                  <div className='bg-foreground/10 group-hover:bg-accent rounded-full p-2 transition-colors group-hover:text-black'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='h-5 w-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0'
                    >
                      <path d='M5 12h14M12 5l7 7-7 7' />
                    </svg>
                  </div>
                </div>

                <h3 className='font-vazirmatn text-foreground group-hover:text-accent mb-2 text-2xl transition-colors'>
                  {service.title}
                </h3>
                <p className='font-space text-foreground/50 mb-4 text-sm tracking-wider uppercase'>
                  {service.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
