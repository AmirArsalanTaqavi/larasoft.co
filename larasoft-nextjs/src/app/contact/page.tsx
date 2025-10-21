// src/app/contact/page.tsx

import ContactForm from '@/components/ContactForm';
// 1. Correct the import statement
import { getItemBySlug } from '@/lib/wordpress'; 
import { notFound } from 'next/navigation';

export default async function ContactPage() {
  // 2. Use the new function and specify you're looking for a 'page'
  const page = await getItemBySlug('contact', 'pages');

  // If the page with slug 'contact' doesn't exist in WordPress, show a 404 page
  if (!page) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 pt-26 pb-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 
          className="text-4xl md:text-5xl font-extrabold mb-4 text-text"
          dangerouslySetInnerHTML={{ __html: page.title.rendered }} 
        />
        
        <div 
          className="prose lg:prose-xl mx-auto text-text/80"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }} 
        />
      </div>

      <ContactForm />
    </main>
  );
}