import React from 'react';
import Link from 'next/link';
import { getServiceList } from '@/lib/wordpress';
import { Metadata } from 'next';
import DotPattern from '@/components/ui/dot-pattern';

export const metadata: Metadata = {
  title: 'سرویس‌ها | LaraSoft',
  description: 'خدمات حرفه‌ای فناوری اطلاعات، شبکه و برنامه‌نویسی',
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getServiceList();

  return (
    <main className='min-h-screen w-full px-6 pt-32 pb-20 md:px-12'>
      <div className='mx-auto max-w-7xl'>
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
                className='border-background/10 bg-foreground/5 hover:border-accent/50 hover:bg-foreground/10 animate-in fade-in slide-in-from-bottom-8 h-full rounded-2xl border p-8 backdrop-blur-2xl transition-all duration-500'
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <DotPattern className='rounded-md' />
                <div className='mb-8 flex items-start justify-between'>
                  <span className='font-space text-foreground/20 group-hover:text-accent text-4xl transition-colors'>
                    {service.number}
                  </span>

                  {/* Fixed: Icon Container & Smooth Rotation */}
                  {/* We rotate this OUTER div instead of the SVG directly to prevent wobble */}
                  <div className='bg-foreground/10 group-hover:bg-accent relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-all duration-500 group-hover:text-black'>
                    <div className='flex h-5 w-5 -rotate-45 transform items-center justify-center transition-transform duration-500 ease-out group-hover:rotate-0'>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path d='M5 12h14M12 5l7 7-7 7' />
                      </svg>
                    </div>
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
