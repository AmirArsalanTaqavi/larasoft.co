// src/app/page.tsx

import { getItemBySlug, getPages, getAcfOptions, getPosts,getServices } from '@/lib/wordpress';
import Link from 'next/link';
// Import your intro component
import LarasoftIntro from '@/components/LarasoftIntro';


export default async function HomePage() {
  // --- Fetch All Data in Parallel ---
  const [homepageContent, services, siteOptions, latestPosts] = await Promise.all([
    getItemBySlug('home', 'pages'),
    getServices(),
    getAcfOptions(),
    getPosts() // Fetching the latest posts
  ]);

  const heroImageUrl = siteOptions?.hero_background_image?.url;
  
  // --- MOCKED DATA ---
  const mockHomepageContent = {
    title: { rendered: 'Larasoft' },
    acf: {
      hero_title: 'Larasoft',
      hero_subtitle: 'Crafting digital excellence, one line of code at a time.',
      hero_button_text: 'Explore Services',
      hero_button_link: '#',
      services_section_title: 'Our Services',
      posts_section_title: 'Latest News'
    }
  };
  
  const mockServices = [
    { id: 1, slug: 'web-dev', title: { rendered: 'Web Development' }, excerpt: { rendered: '<p>Building fast, scalable web applications.</p>' } },
    { id: 2, slug: 'mobile-dev', title: { rendered: 'Mobile Apps' }, excerpt: { rendered: '<p>Native and cross-platform mobile solutions.</p>' } },
    { id: 3, slug: 'cloud', title: { rendered: 'Cloud Solutions' }, excerpt: { rendered: '<p>Expert cloud infrastructure and deployment.</p>' } },
  ];
  
  const mockPosts = [
    { id: 1, slug: 'new-tech', title: { rendered: 'The Future of Web' } },
    { id: 2, slug: 'ai-impact', title: { rendered: 'AI in Development' } },
    { id: 3, slug: 'our-process', title: { rendered: 'Our Design Process' } },
  ];
  
  const finalHomepageContent = homepageContent || mockHomepageContent;
  const finalServices = services.length > 0 ? services : mockServices;
  const finalLatestPosts = latestPosts.length > 0 ? latestPosts : mockPosts;
  // --- END MOCKED DATA ---
  

  // --- Extract ACF Fields with Fallbacks ---
  const acf = finalHomepageContent.acf as Record<string, unknown> | undefined;

  // Safely coerce ACF values to strings (if present) to satisfy ReactNode typing
  const heroTitle = typeof acf?.hero_title === 'string' ? acf.hero_title : finalHomepageContent.title.rendered;
  const heroSubtitle = typeof acf?.hero_subtitle === 'string' ? acf.hero_subtitle : '';
  const heroButtonText = typeof acf?.hero_button_text === 'string' ? acf.hero_button_text : '';
  const heroButtonLink = typeof acf?.hero_button_link === 'string' ? acf.hero_button_link : '#';
  const servicesTitle = typeof acf?.services_section_title === 'string' ? acf.services_section_title : 'خدمات ما';
  const postsTitle = typeof acf?.posts_section_title === 'string' ? acf.posts_section_title : 'آخرین مقالات و اخبار';

  return (
    <main>
      {/* --- HERO / INTRO SECTION --- */}
      {/* Pass your data as props.
        Wrap the rest of your page content INSIDE the component.
      */}
      {/* @ts-ignore */}
      <LarasoftIntro
        title={heroTitle}
        subtitle={heroSubtitle}
        buttonText={heroButtonText}
        buttonLink={heroButtonLink}
      >
        {/* --- SERVICES SECTION (Now passed as children) --- */}
        <section className="content-background-pattern py-16 sm:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold text-text mb-12 font-larasoft">
              {servicesTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {finalServices.map((service) => (
                // @ts-ignore
                <Link href={`/services/${service.slug}`} key={service.id} className="group block p-8 border shadow-lg text-center bg-primary rounded-lg hover:bg-secondary hover:shadow-accent transition-all duration-300">
                  <h3 className="text-2xl font-bold text-accent group-hover:text-background transition-colors">
                    {/* @ts-ignore */}
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
        
        {/* --- LATEST POSTS SECTION (Now passed as children) --- */}
        <section className="content-background-pattern py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold text-text mb-12 font-larasoft">
              {postsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {finalLatestPosts.map((post) => (
                // @ts-ignore
                <Link href={`/posts/${post.slug}`} key={post.id} className="group block p-8 border shadow-lg text-center bg-primary rounded-lg hover:bg-secondary hover:shadow-accent transition-all duration-300">
                  <h3 className="text-2xl font-bold text-accent group-hover:text-background transition-colors">
                    {/* @ts-ignore */}
                    {post.title.rendered}
                  </h3>
                  <span className="block text-accent font-medium mt-4 text-right">ادامه مطلب &larr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </LarasoftIntro>
      
    </main>
  );
}