import React from 'react';
import { getServiceList, getItemBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MagneticButton } from '@/components/magnetic-button';
import PriceCalculator from '@/components/PriceCalculator';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServiceList();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getItemBySlug(slug, 'services');

  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title.rendered} | LaraSoft`,
    description: service.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160),
  };
}

export default async function ServiceSinglePage({ params }: Props) {
  const { slug } = await params;
  const service = await getItemBySlug(slug, 'services');

  if (!service) notFound();

  return (
    <main className='relative min-h-screen w-full px-6 pt-32 pb-20 md:px-12'>
      <article className='mx-auto max-w-6xl'>
        <header className='border-foreground/10 mb-16 border-b pb-16'>
          <div className='mb-6 flex items-center gap-4'>
            <span className='border-accent/50 text-accent font-space rounded-full border px-3 py-1 text-xs uppercase'>
              Service
            </span>
            {service.acf?.category && (
              <span className='border-foreground/10 text-foreground/60 font-space rounded-full border px-3 py-1 text-xs uppercase'>
                {String(service.acf.category)}
              </span>
            )}
          </div>

          <h1
            className='font-larasoft text-foreground mb-8 text-5xl md:text-7xl lg:text-8xl'
            dangerouslySetInnerHTML={{ __html: service.title.rendered }}
          />
        </header>

        {/* Main Content */}
        <div
          className='font-vazirmatn text-foreground/90 prose prose-invert prose-lg prose-headings:font-larasoft prose-headings:font-light prose-a:text-accent hover:prose-a:text-accent/80 mb-16 max-w-none text-lg leading-loose'
          dangerouslySetInnerHTML={{ __html: service.content.rendered }}
        />

        {/* Price Calculator Section - Spaced Out */}
        {slug === 'network-support' && (
          <section className=''>
            <div className='px-6 md:px-5'>
              <h2 className='font-larasoft mb-8 text-center text-3xl'>
                محاسبه آنلاین هزینه پشتیبانی
              </h2>
              <div className='border-accent/20 bg-background/50 mx-auto w-full rounded-2xl border p-2 backdrop-blur-sm'>
                <PriceCalculator />
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <div className='border-accent/20 bg-accent/5 mt-24 rounded-3xl border p-8 text-center md:p-12'>
          <h3 className='font-vazirmatn mb-6 text-2xl md:text-3xl'>
            آیا به این سرویس برای کسب‌وکارتان نیاز دارید؟
          </h3>
          <MagneticButton variant='primary' size='lg' href='/#section-4'>
            سفارش پروژه
          </MagneticButton>
        </div>
      </article>
    </main>
  );
}
