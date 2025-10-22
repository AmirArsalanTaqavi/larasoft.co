// src/app/about/page.tsx

import { getItemBySlug, WpPostAcf } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// 1. Generate SEO Metadata for this specific page
export async function generateMetadata(): Promise<Metadata> {
  const page = await getItemBySlug('about', 'pages');

  if (!page) {
    return { title: 'Page Not Found' };
  }
  
  // Use Yoast data if available, otherwise fall back
  const title = page.yoast_head_json?.title ?? page.title.rendered;
  const description = page.yoast_head_json?.description ?? '';

  return {
    title: title,
    description: description,
    openGraph: {
      title: page.yoast_head_json?.og_title ?? title,
      description: page.yoast_head_json?.og_description ?? description,
      images: page.yoast_head_json?.og_image?.map((img) => img.url) ?? [],
    },
  };
}

// 2. The About Page Component
export default async function AboutPage() {
  // Fetch the page content
  const page = await getItemBySlug('about', 'pages');

  if (!page || !page.acf) {
    notFound();
  }

  // Get ACF fields
  const acf = page.acf as WpPostAcf;

  const headline = acf.page_headline as string || page.title.rendered;
  const content = acf.page_content as string || '';

  return (
    <main className="container mx-auto p-8 pt-24">
      <article className="max-w-4xl mx-auto bg-surface p-10 rounded-lg shadow-lg">
        
        <h1 className="text-4xl font-larasoft text-primary mb-8 text-center">
          {headline}
        </h1>
        
        {/* Render the WYSIWYG content */}
        <div 
          className="prose prose-lg max-w-none text-text mt-8"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
        
      </article>
    </main>
  );
}