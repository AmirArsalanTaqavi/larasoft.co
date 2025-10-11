import { getPageBySlug, getPages } from '@/lib/wordpress'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PriceCalculator from '@/components/PriceCalculator'; // <-- Calculator component imported

// 1. Dynamic Metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const service = await getPageBySlug(params.slug); 
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

// 3. The Single Service Page Component
export default async function SingleServicePage({ params }: { params: { slug: string } }) {
    // Fetch the full content based on the URL slug
    const service = await getPageBySlug(params.slug);

    if (!service) {
        notFound();
    }

    // Define the specific slug for the calculator page.
    // NOTE: Ensure your "Network Support" page in WordPress uses this exact slug.
    const calculatorSlug = 'network-support'; 

    return (
        <main className="min-h-screen bg-gray-50 p-10">
            
            {/* 🎯 Section A: Main Service Content (Always displayed) 🎯 */}
            <article className="max-w-5xl mx-auto bg-white p-12 rounded-xl shadow-2xl">
                
                <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">
                    خدمات: {service.title.rendered}
                </h1>
                
                <div 
                    className="prose prose-lg max-w-none text-gray-700 mt-8" 
                    dangerouslySetInnerHTML={{ __html: service.content.rendered }} 
                />
            </article>

            {/* 🎯 Section B: Price Calculator (Conditionally displayed) 🎯 */}
            {params.slug === calculatorSlug && (
                <div className="max-w-5xl mx-auto mt-12">
                    <PriceCalculator />
                </div>
            )}
            
            {/* Section C: Back Link (Always displayed) */}
            <Link href="/" className="block text-center mt-12 text-xl text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                &larr; بازگشت به صفحه اصلی
            </Link>
        </main>
    );
}