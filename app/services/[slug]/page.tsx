// src/app/services/[slug]/page.tsx

import { getItemBySlug, getServices } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PriceCalculator from '@/components/PriceCalculator';
import { FloatingNavbar } from '@/components/floating-navbar';

// 1. Dynamic Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const service = await getItemBySlug(slug, 'services');

  if (!service) {
    return { title: 'Service Not Found | LaraSoft' };
  }

  // Use Yoast data first, then fall back
  const title = service.yoast_head_json?.title ?? service.title.rendered;
  const description =
    service.yoast_head_json?.description ??
    service.excerpt?.rendered.replace(/<[^>]*>/g, '') ??
    '';

  return {
    title: title,
    description: description,
    // You can also add OpenGraph data from Yoast here
    openGraph: {
      title: service.yoast_head_json?.og_title ?? title,
      description: service.yoast_head_json?.og_description ?? description,
      images: service.yoast_head_json?.og_image?.map((img) => img.url) ?? [],
    },
  };
}

// 2. Static Generation Params
export async function generateStaticParams() {
  const services = await getServices();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

// 3. The Single Service Page Component
export default async function SingleServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // Fetch the full content based on the URL slug
  const service = await getItemBySlug(slug, 'services');

  if (!service) {
    notFound();
  }

  // Define the specific slug for the calculator page.
  const calculatorSlug = 'network-support';

  return (
    <main className='px-10 pt-30'>
      {/* 🎯 Section A: Main Service Content (Always displayed) 🎯 */}
      <article className='bg-accent/75 relative mx-auto max-w-5xl rounded-md p-12 shadow-2xl'>
        <h2 className='font-larasoft text-primary mb-2 text-5xl tracking-tight md:text-6xl lg:text-7xl'>
          {service.title.rendered}{' '}
        </h2>
        <p className='font-space text-secondary/60 text-sm md:text-base'>
          خدمات:
        </p>
        <div
          className='prose prose-lg text-text mt-8 max-w-none'
          dangerouslySetInnerHTML={{ __html: service.content.rendered }}
        />
      </article>

      {/* 🎯 Section B: Price Calculator (Conditionally displayed) 🎯 */}
      {slug === calculatorSlug && (
        <div className='text-accent bg-background/5 border-background/30 relative mx-auto mt-12 max-w-5xl rounded-md border backdrop-blur-xl'>
          <PriceCalculator />
        </div>
      )}

      {/* Section C: Back Link (Always displayed) */}
      <Link
        href='/'
        className='text-primary hover:text-accent mt-12 block text-center text-xl transition-colors duration-200'
      >
        &larr; بازگشت به صفحه اصلی
      </Link>
    </main>
  );
}
