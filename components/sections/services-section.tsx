'use client';

import { useReveal } from '@/hooks/use-reveal';
import { MagneticButton } from '../magnetic-button';
import { NormalizedService } from '@/lib/wordpress';
import Link from 'next/link';

interface ServicesSectionProps {
  services: NormalizedService[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const { ref, isVisible } = useReveal(0.3);

  // Fallback if API fails or returns empty
  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <section
      ref={ref}
      id='section-1'
      className='flex h-dvh w-dvw shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16'
    >
      <div className='mx-auto w-dvw max-w-7xl'>
        {/* Header */}
        <div
          className={`mb-6 transition-all duration-700 md:mb-12 ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-12 opacity-0'
          }`}
        >
          <h2 className='font-larasoft mb-2 text-2xl font-light tracking-tight md:text-xl lg:text-6xl'>
            سرویس ها
          </h2>
          <p className='font-space text-foreground/60 text-sm md:text-base'>
            / Services
          </p>

          <MagneticButton variant='white' href='/services' className='mt-3'>
            همه سرویس ها
          </MagneticButton>
        </div>

        {/* Services list */}
        <div className='space-y-6 md:space-y-6'>
          {displayServices.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              index={i}
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
  const getRevealClass = () => {
    if (!isVisible) {
      return service.direction === 'left'
        ? '-translate-x-16 opacity-0'
        : 'translate-x-16 opacity-0';
    }
    return 'translate-x-0 opacity-100';
  };

  return (
    <div
      className={`group border-secondary/50 hover:border-accent/50 flex items-center justify-between border-b py-2 transition-all duration-700 md:py-3 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? '0' : 'auto',
        maxWidth: index % 2 === 0 ? '85%' : '90%',
      }}
    >
      <div className='flex items-baseline gap-3 md:gap-6'>
        <span className='font-space text-foreground/30 group-hover:text-foreground/50 text-xs transition-colors md:text-base'>
          {service.number}
        </span>

        <div>
          <h3 className='font-vazirmatn text-foreground mb-1 text-xl font-light transition-transform duration-300 group-hover:translate-x-2 md:text-2xl lg:text-2xl'>
            {service.title}
          </h3>

          <p className='font-space text-foreground/50 text-sm md:text-sm'>
            {service.category}
          </p>
        </div>
      </div>

      <span className='font-vazirmatn text-foreground/30 text-xs md:text-sm'>
        <MagneticButton
          variant='ghost'
          href={`/services/${service.slug}`}
          className='mt-3'
        >
          بیشتر
        </MagneticButton>
      </span>
    </div>
  );
}

// Fallback data just in case WP is down
const fallbackServices: NormalizedService[] = [
  {
    number: '01',
    title: 'پشتیبانی شبکه',
    category: 'IT Support',
    slug: 'network-support',
    direction: 'left',
  },
  {
    number: '02',
    title: 'طراحی وبسایت',
    category: 'Website Development',
    slug: 'website-development',
    direction: 'right',
  },
  {
    number: '03',
    title: 'هاستینگ و دامین',
    category: 'Domain & Hosting',
    slug: 'domain-hosting',
    direction: 'left',
  },
  {
    number: '04',
    title: 'امنیت سایبری',
    category: 'Cybersecurity',
    slug: 'cybersecurity',
    direction: 'right',
  },
];
