// src/app/services/[slug]/page.tsx

import { getItemBySlug, getServices } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PriceCalculator from '@/components/PriceCalculator';

// 1. Dynamic Metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const service = await getItemBySlug(slug, 'services');
    
    if (!service) {
        return { title: 'Service Not Found | LaraSoft' };
    }

    // Use Yoast data first, then fall back
    const title = service.yoast_head_json?.title ?? service.title.rendered;
    const description = service.yoast_head_json?.description ?? service.excerpt?.rendered.replace(/<[^>]*>/g, '') ?? '';

    return {
        title: title,
        description: description,
        // You can also add OpenGraph data from Yoast here
        openGraph: {
          title: service.yoast_head_json?.og_title ?? title,
          description: service.yoast_head_json?.og_description ?? description,
          images: service.yoast_head_json?.og_image?.map((img) => img.url) ?? [],
        }
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
export default async function SingleServicePage({ params }: { params: { slug: string } }) {
    const { slug } = await params; 
    
    // Fetch the full content based on the URL slug
    const service = await getItemBySlug(slug, 'services');

    if (!service) {
        notFound();
    }

    // Define the specific slug for the calculator page.
    const calculatorSlug = 'network-support'; 

    return (
        <main className="p-10 pt-26"> 

            {/* 🎯 Section A: Main Service Content (Always displayed) 🎯 */}
            <article className="max-w-5xl mx-auto bg-accent p-12 rounded-xl shadow-2xl relative z-20 bg-accent-500"> 
                
                <h1 className="text-4xl md:text-6xl font-larasoft text-primary mb-8">
                    خدمات: {service.title.rendered}
                </h1>
                <div 
                    className="prose prose-lg max-w-none text-text mt-8"
                    dangerouslySetInnerHTML={{ __html: service.content.rendered }} 
                />
            </article>

            {/* 🎯 Section B: Price Calculator (Conditionally displayed) 🎯 */}
            {slug === calculatorSlug && (
                <div className="max-w-5xl mx-auto mt-12 relative z-20 text-accent-50 bg-background-500">
                    <PriceCalculator />
                </div>
            )}
            
            {/* Section C: Back Link (Always displayed) */}
            <Link 
                href="/" 
                className="block text-center mt-12 text-xl text-primary hover:text-accent transition-colors duration-200"
            >
                &larr; بازگشت به صفحه اصلی
            </Link>
        </main>
    );
}