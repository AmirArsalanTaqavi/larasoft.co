import { getPageBySlug, getPages } from '@/lib/wordpress'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PriceCalculator from '@/components/PriceCalculator';

// 1. Dynamic Metadata for SEO (FIXED: Destructuring)
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = params; // FIX: Destructuring parameter
    const service = await getPageBySlug(slug); // Use destructured slug
    
    if (!service) {
        return { title: 'Service Not Found | LaraSoft' };
    }

    return {
        title: service.title.rendered,
        description: service.excerpt.rendered.replace(/<[^>]*>/g, ''),
    };
}

// 2. Static Generation Params (Tells Next.js which paths to pre-build)
export async function generateStaticParams() {
    const services = await getPages();

    return services.map((service) => ({
        slug: service.slug,
    }));
}

// 3. The Single Service Page Component (FIXED: Destructuring in component body)
export default async function SingleServicePage({ params }: { params: { slug: string } }) {
    const { slug } = params; // FIX: Destructuring parameter
    
    // Fetch the full content based on the URL slug
    const service = await getPageBySlug(slug);

    if (!service) {
        notFound();
    }

    // Define the specific slug for the calculator page.
    const calculatorSlug = 'network-support'; 

    return (
        <main className="p-10"> 

            {/* 🎯 Section A: Main Service Content (Always displayed) 🎯 */}
            <article className="max-w-5xl mx-auto bg-background/90 p-12 rounded-xl shadow-2xl relative z-20"> 
                
                <h1 className="text-4xl font-extrabold text-primary mb-6">
                    خدمات: {service.title.rendered}
                </h1>
                
                <div 
                    className="prose prose-lg max-w-none text-text mt-8"
                    dangerouslySetInnerHTML={{ __html: service.content.rendered }} 
                />
            </article>

            {/* 🎯 Section B: Price Calculator (Conditionally displayed) 🎯 */}
            {slug === calculatorSlug && ( // FIX: Use destructured slug here
                <div className="max-w-5xl mx-auto mt-12 relative z-20 bg-transparent">
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