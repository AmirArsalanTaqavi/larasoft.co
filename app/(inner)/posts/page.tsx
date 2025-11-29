import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image
import { getPostList } from '@/lib/wordpress';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'مقالات | LaraSoft',
  description: 'آخرین اخبار و مقالات دنیای تکنولوژی و شبکه',
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPostList();

  return (
    <main className='min-h-screen w-full px-6 pt-32 pb-20 md:px-12'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-16'>
          <h1 className='font-larasoft text-foreground mb-4 text-5xl md:text-7xl'>
            وبلاگ
          </h1>
          <p className='font-vazirmatn text-foreground/60 text-lg'>
            دانش و تجربیات ما در دنیای دیجیتال
          </p>
        </div>

        <div className='grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2'>
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className='group block'
            >
              {/* Dynamic Image Container */}
              <div className='bg-foreground/5 border-foreground/10 group-hover:border-accent/50 relative mb-6 aspect-video w-full overflow-hidden rounded-2xl border transition-colors'>
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                ) : (
                  // Fallback Gradient if no image
                  <div className='from-foreground/10 h-full w-full bg-gradient-to-tr to-transparent opacity-50 transition-transform duration-700 group-hover:scale-105' />
                )}
              </div>

              <div className='font-space text-foreground/50 mb-3 flex items-center gap-3 text-xs'>
                <span>{post.number}</span>
                <span className='bg-accent h-1 w-1 rounded-full' />
                <span>{post.category}</span>
              </div>

              <h2 className='font-vazirmatn group-hover:text-accent mb-3 text-2xl transition-colors md:text-3xl'>
                {post.title}
              </h2>

              <div
                className='font-vazirmatn text-foreground/60 mb-4 line-clamp-3 text-sm leading-relaxed'
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />

              <span className='font-vazirmatn text-accent border-accent/30 border-b pb-0.5 text-sm'>
                ادامه مطلب
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
