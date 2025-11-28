'use client';

import { useReveal } from '@/hooks/use-reveal';
import { MagneticButton } from '../magnetic-button';

export function BlogSection() {
  const { ref, isVisible } = useReveal(0.3);

  const blogs = [
    {
      id: '01',
      title: 'Creative Development',
      description: "Pushing the boundaries of what's possible on the web",
      direction: 'top',
      slug: '',
    },
    {
      id: '02',
      title: 'Visual Design',
      description:
        'Crafting memorable experiences through thoughtful aesthetics',
      direction: 'right',
      slug: '',
    },
    {
      id: '03',
      title: 'Motion & Animation',
      description: 'Bringing interfaces to life with purposeful movement',
      direction: 'left',
      slug: '',
    },
    {
      id: '04',
      title: 'Technical Strategy',
      description: 'Building scalable solutions that perform beautifully',
      direction: 'bottom',
      slug: '',
    },
  ];

  return (
    <section
      id='section-2'
      ref={ref}
      className='flex h-dvh w-dvw shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16'
    >
      <div className='mx-auto w-full max-w-7xl'>
        {/* Heading */}
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : '-translate-y-12 opacity-0'
          }`}
        >
          <h2 className='font-larasoft mb-2 text-2xl font-light tracking-tight md:text-xl lg:text-6xl'>
            مقالات
          </h2>
          <p className='font-space text-foreground/60 text-sm md:text-base'>
            / Blog
          </p>
          <MagneticButton variant='white' href='/posts' className='mt-3'>
            همه مقالات
          </MagneticButton>
        </div>

        {/* Cards */}
        <div className='font-vazirmatn grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24'>
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({
  blog,
  index,
  isVisible,
}: {
  blog: {
    id: string;
    title: string;
    description: string;
    direction: string;
    slug: string;
  };
  index: number;
  isVisible: boolean;
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (blog.direction) {
        case 'left':
          return '-translate-x-16 opacity-0';
        case 'right':
          return 'translate-x-16 opacity-0';
        case 'top':
          return '-translate-y-16 opacity-0';
        case 'bottom':
          return 'translate-y-16 opacity-0';
        default:
          return 'translate-y-12 opacity-0';
      }
    }
    return 'translate-x-0 translate-y-0 opacity-100';
  };

  return (
    <div
      className={`group hover:border-accent rounded-md pt-2 pr-4 pb-3 transition-all duration-700 hover:border ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className='mb-3 flex items-center gap-3'>
        <div className='bg-foreground/30 group-hover:bg-accent h-px w-8 transition-all duration-300 group-hover:w-12' />
        <span className='font-space text-foreground/60 text-xs'>{blog.id}</span>
      </div>

      <h3 className='font-space text-foreground mb-2 text-2xl font-light md:text-3xl'>
        {blog.title}
      </h3>
      <p className='text-foreground/80 max-w-sm text-sm leading-relaxed md:text-base'>
        {blog.description}
      </p>
      <MagneticButton
        variant='ghost'
        href={`/services/${blog.slug}`}
        className='mt-3'
      >
        بیشتر
      </MagneticButton>
    </div>
  );
}
