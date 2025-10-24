// src/app/page.tsx

import { getItemBySlug, getPages, getAcfOptions, getPosts,getServices } from '@/lib/wordpress';
import Link from 'next/link';

export default async function HomePage() {
  // --- Fetch All Data in Parallel ---
  const [homepageContent, services, siteOptions, latestPosts] = await Promise.all([
    getItemBySlug('home', 'pages'),
    getServices(),
    getAcfOptions(),
    getPosts() // Fetching the latest posts
  ]);

  const heroImageUrl = siteOptions?.hero_background_image?.url;
  
  if (!homepageContent) {
    return <p className="text-center p-12 text-text">محتوای صفحه اصلی یافت نشد.</p>;
  }

  // --- Extract ACF Fields with Fallbacks ---
  const acf = homepageContent.acf as Record<string, unknown> | undefined;

  // Safely coerce ACF values to strings (if present) to satisfy ReactNode typing
  const heroTitle = typeof acf?.hero_title === 'string' ? acf.hero_title : homepageContent.title.rendered;
  const heroSubtitle = typeof acf?.hero_subtitle === 'string' ? acf.hero_subtitle : '';
  const heroButtonText = typeof acf?.hero_button_text === 'string' ? acf.hero_button_text : '';
  const heroButtonLink = typeof acf?.hero_button_link === 'string' ? acf.hero_button_link : '#';
  const servicesTitle = typeof acf?.services_section_title === 'string' ? acf.services_section_title : 'خدمات ما';
  const postsTitle = typeof acf?.posts_section_title === 'string' ? acf.posts_section_title : 'آخرین مقالات و اخبار';

  return (
    <main>
      {/* --- HERO SECTION --- */}
      <section
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-center p-4"
        style={{
          backgroundImage: heroImageUrl ? `url(${heroImageUrl})` : 'none',
          WebkitMaskImage: heroImageUrl ? 'linear-gradient(to bottom, black 60%, transparent 100%)' : undefined,
          maskImage: heroImageUrl ? 'linear-gradient(to bottom, black 60%, transparent 100%)' : undefined,
          WebkitMaskSize: heroImageUrl ? '100% 100%' : undefined,
          maskSize: heroImageUrl ? '100% 100%' : undefined,
        }}
      >
  <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl leading-tight font-larasoft text-accent">
            {heroTitle}
          </h1>
          <p className="mt-4 text-xl text-text max-w-3xl mx-auto">
            {heroSubtitle}
          </p>
          {heroButtonText && (
            <Link 
              href={heroButtonLink}
              className="mt-8 inline-block bg-secondary text-background font-bold px-8 py-3 rounded-lg hover:bg-primary transition-colors shadow-lg"
            >
              {heroButtonText}
            </Link>
          )}
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-text mb-12 font-larasoft">
            {servicesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link href={`/services/${service.slug}`} key={service.id} className="group block p-8 border shadow-lg text-center bg-primary rounded-lg hover:bg-secondary hover:shadow-accent transition-all duration-300">
                <h3 className="text-2xl font-bold text-accent group-hover:text-background transition-colors">
                  {service.title.rendered}
                </h3>
                  <div 
                  dangerouslySetInnerHTML={{ __html: service.excerpt?.rendered ?? '' }} 
                  className="text-text/70 mt-4"
                />
                <span className="text-accent hover:text-primary mt-6 inline-block font-bold">
                  اطلاعات بیشتر &larr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- LATEST POSTS SECTION --- */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-text mb-12 font-larasoft">
            {postsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link href={`/posts/${post.slug}`} key={post.id} className="group block p-8 border shadow-lg text-center bg-primary rounded-lg hover:bg-secondary hover:shadow-accent transition-all duration-300">
                <h3 className="text-2xl font-bold text-accent group-hover:text-background transition-colors">
                  {post.title.rendered}
                </h3>
                <span className="block text-accent font-medium mt-4 text-right">ادامه مطلب &larr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}