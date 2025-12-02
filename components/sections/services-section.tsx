'use client';

import { useReveal } from '@/hooks/use-reveal';
import { MagneticButton } from '../magnetic-button';
import { NormalizedService } from '@/lib/wordpress';
import Link from 'next/link';
import DotPattern from '../ui/dot-pattern';

interface ServicesSectionProps {
  services: NormalizedService[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const { ref, isVisible } = useReveal(0.3);

  // If WordPress returns data, use it. Otherwise, use fallback.
  const displayServices =
    services && services.length > 0 ? services : fallbackServices;

  return (
    <section
      ref={ref}
      id='section-1'
      className='flex h-dvh w-dvw shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16'
    >
      <div className='mx-auto w-full max-w-7xl'>
        {/* Header */}
        <div
          className={`mb-6 transition-all duration-700 md:mb-12 ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-12 opacity-0'
          }`}
        >
          <h2 className='font-larasoft mb-2 text-4xl font-light tracking-tight md:text-4xl lg:text-6xl'>
            راهکارهای ما
          </h2>
          <p className='font-space text-foreground/60 text-sm md:text-base'>
            / Our Solutions
          </p>

          <MagneticButton variant='white' href='/services' className='mt-3'>
            مشاهده همه خدمات
          </MagneticButton>
        </div>

        {/* Services Grid */}
        <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-2' dir='ltr'>
          {displayServices.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: NormalizedService;
  index: number;
  isVisible: boolean;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group border-foreground/10 hover:border-accent hover:bg-Background/20 bg-background/10 relative flex flex-col justify-between rounded-xl border p-4 backdrop-blur-2xl transition-all duration-500 hover:shadow-lg ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <DotPattern className='rounded-2xl' />
      <div className='flex items-start justify-between gap-3 md:gap-6'>
        <span className='font-space text-foreground/30 group-hover:text-accent text-xs transition-colors md:text-base'>
          {service.number}
        </span>

        <div>
          <h3 className='font-vazirmatn text-foreground mb-1 text-xl font-light transition-transform duration-300 group-hover:-translate-x-2 md:text-2xl lg:text-2xl'>
            {service.title}
          </h3>

          <p className='font-space text-foreground/50 text-sm md:text-sm'>
            {service.category}
          </p>
        </div>
      </div>

      {/* Visual indicator that this is a link */}
      <span className='font-vazirmatn text-foreground/30 text-xs md:text-sm'>
        <div className='group-hover:text-accent mt-3 inline-flex items-center gap-2 text-sm transition-colors'>
          <span>توضیحات بیشتر</span>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='transition-transform duration-300 group-hover:-translate-x-1'
          >
            <path
              d='M6 1L1 6M1 6L6 11M1 6H11'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </span>
    </Link>
  );
}

// Fallback data (Updated to match NormalizedService interface)
const fallbackServices: NormalizedService[] = [
  {
    number: '01',
    title: 'پشتیبانی شبکه و زیرساخت',
    category: 'Network Infrastructure',
    slug: 'network-support',
    direction: 'left',
    image: null,
  },
  {
    number: '02',
    title: 'توسعه نرم‌افزار و وب',
    category: 'Software Solutions',
    slug: 'website-development',
    direction: 'right',
    image: null,
  },
  {
    number: '03',
    title: 'امنیت سایبری',
    category: 'Cybersecurity',
    slug: 'cyber-security',
    direction: 'top',
    image: null,
  },
  {
    number: '04',
    title: 'خدمات دیتاسنتر',
    category: 'Data Center',
    slug: 'data-center',
    direction: 'bottom',
    image: null,
  },
];
