'use client';

import { useReveal } from '@/hooks/use-reveal';
import { MagneticButton } from '../magnetic-button';
import { NormalizedPost } from '@/lib/wordpress';
import Link from 'next/link';
import { DotPattern } from '../ui/dot-pattern';

interface BlogSectionProps {
  posts: NormalizedPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const { ref, isVisible } = useReveal(0.3);

  // Fallback if API fails
  const displayPosts = posts && posts.length > 0 ? posts : fallbackPosts;

  return (
    <section
      id='section-2'
      ref={ref}
      className='md:px-clear flex h-dvh w-dvw shrink-0 snap-start items-center px-6 pt-20 md:pt-0 lg:px-16'
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
          <h2 className='font-larasoft mb-2 text-4xl font-light tracking-tight md:text-4xl lg:text-6xl'>
            دانش و فناوری
          </h2>
          <p className='font-space text-foreground/60 text-sm md:text-base'>
            / Latest Insights
          </p>
          <MagneticButton variant='white' href='/posts' className='mt-3'>
            آرشیو مقالات
          </MagneticButton>
        </div>

        {/* Blog Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {displayPosts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
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
  post,
  index,
  isVisible,
}: {
  post: NormalizedPost;
  index: number;
  isVisible: boolean;
}) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={`group border-foreground/10 hover:border-accent hover:bg-Background/20 bg-background/10 relative flex flex-col justify-between rounded-xl border p-4 backdrop-blur-2xl transition-all duration-500 hover:shadow-lg ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <DotPattern className='rounded-2xl' />
      <div>
        <div className='mb-4 flex items-center justify-between'>
          <span className='font-space text-accent text-xs'>{post.number}</span>
          <span className='font-space border-foreground/10 text-foreground/60 rounded-full border px-2 py-0.5 text-[10px] uppercase'>
            {post.category}
          </span>
        </div>

        <h3 className='font-vazirmatn text-foreground group-hover:text-accent text-md mb-2 text-justify leading-snug font-medium transition-colors md:text-xl'>
          {post.title}
        </h3>
        <div
          className='font-vazirmatn text-foreground/60 line-clamp-3 max-w-sm text-justify text-xs leading-relaxed md:text-sm'
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
      </div>

      <div className='text-foreground/40 group-hover:text-accent mt-4 flex items-center gap-2 text-xs font-medium transition-colors'>
        <span>مطالعه کنید</span>
        <svg
          width='10'
          height='10'
          viewBox='0 0 10 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='transition-transform duration-300 group-hover:-translate-x-1'
        >
          <path
            d='M4.5 1L0.5 5M0.5 5L4.5 9M0.5 5H9.5'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </Link>
  );
}

const fallbackPosts: NormalizedPost[] = [
  {
    number: '01',
    title: 'استراتژی‌های تحول دیجیتال در سازمان‌های مدرن',
    excerpt:
      'چگونه فناوری‌های نوین می‌توانند بازدهی عملیاتی سازمان شما را تا ۵۰٪ افزایش دهند.',
    category: 'Business',
    direction: 'top',
    slug: 'post-1',
    image: null,
  },
  {
    number: '02',
    title: 'چشم‌انداز امنیت سایبری در سال ۲۰۲۵',
    excerpt:
      'تحلیل تهدیدات نوظهور و راهکارهای جامع دفاعی برای حفاظت از دارایی‌های دیجیتال.',
    category: 'Security',
    direction: 'right',
    slug: 'post-2',
    image: null,
  },
  {
    number: '03',
    title: 'نقش حیاتی تجربه کاربری (UX) در موفقیت محصول',
    excerpt:
      'چرا طراحی کاربرمحور مهم‌ترین وجه تمایز در بازارهای رقابتی امروزی است.',
    category: 'Design',
    direction: 'left',
    slug: 'post-3',
    image: null,
  },
  {
    number: '04',
    title: 'بهینه‌سازی هزینه‌ها با برون‌سپاری خدمات IT',
    excerpt:
      'مدیریت هوشمند منابع و افزایش پایداری سیستم‌ها از طریق خدمات مدیریت شده (Managed Services).',
    category: 'IT Support',
    direction: 'bottom',
    slug: 'post-4',
    image: null,
  },
];
