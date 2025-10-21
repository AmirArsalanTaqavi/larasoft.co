// src/app/services/page.tsx

import { getServices } from '@/lib/wordpress';
import Link from 'next/link';

export default async function ServicesIndexPage() {
  const services = await getServices();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 pt-28">
      <h1 className="text-5xl font-larasoft text-accent mb-12 text-center">
        خدمات ما
      </h1>

      <div className="grid grid-cols-1 gap-8">
        {services.length > 0 ? (
          services.map((service) => (
            <Link 
              href={`/services/${service.slug}`} 
              key={service.id} 
              className="group block p-6 rounded-lg shadow-lg bg-surface border border-text/10 hover:border-accent/50 transition-all duration-300"
            >
              <h3 
                className="text-2xl font-bold text-text group-hover:text-accent transition-colors text-right"
                dangerouslySetInnerHTML={{ __html: service.title.rendered }}
              />
              <div 
                dangerouslySetInnerHTML={{ __html: service.excerpt?.rendered ?? '' }} 
                className="text-text/70 mt-4 text-right"
              />
              <span className="block text-accent font-medium mt-4 text-right">
                اطلاعات بیشتر &larr;
              </span>
            </Link>
          ))
        ) : (
          <p className="text-text/70 text-center">No services found.</p>
        )}
      </div>
    </div>
  );
}