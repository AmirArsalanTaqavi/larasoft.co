import { getPageBySlug, WpPost } from '@/lib/wordpress'; 
import { notFound } from 'next/navigation';

// 1. Dynamic Metadata for SEO
export async function generateMetadata() {
    return {
        title: 'درباره ما | LaraSoft',
        description: 'بنیانگذار و خدمات تخصصی لارا سافت'
    };
}

export default async function AboutPage() {
    // Fetch the page content by its clean slug 'about'
    const aboutContent: WpPost | null = await getPageBySlug('about');

    if (!aboutContent) {
        // If content is missing, show 404
        notFound();
    }

    return (
        <main className="min-h-screen p-10 max-w-5xl mx-auto bg-gray-50">
            
            {/* Display static content */}
            <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">
                {aboutContent.title.rendered}
            </h1>
            
            <div 
                className="prose prose-lg mx-auto mb-10 text-gray-700 mt-8 p-8 bg-white rounded-xl shadow-lg"
                dangerouslySetInnerHTML={{ __html: aboutContent.content.rendered }}
            />
            
        </main>
    );
}