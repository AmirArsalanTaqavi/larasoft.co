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
    <main className="p-10 pt-26"> 
      <article className="max-w-5xl mx-auto bg-accent p-12 rounded-xl shadow-2xl relative z-20"> 
        {/* Post Title */}
          <h1 
            className="text-4xl md:text-6xl font-extrabold mb-8 font-larasoft text-center text-primary"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }} 
          />
      </article>
      <div className="max-w-3xl mx-auto text-center">
        <div 
          className="prose lg:prose-xl mx-auto text-text/80"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }} 
        />
      </div>
      <ContactForm />
    </main>
  );
}