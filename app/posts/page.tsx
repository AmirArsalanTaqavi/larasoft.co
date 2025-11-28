// src/app/posts/page.tsx

import Background from '@/components/background';
import { CustomCursor } from '@/components/custom-cursor';
import { GrainOverlay } from '@/components/grain-overlay';
import Navbar from '@/components/home-navbar';
import { getPosts } from '@/lib/wordpress';
import Link from 'next/link';

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <main className='p-10 pt-30'>
      <div className='relative'>
        <article className='bg-accent border-background mx-auto max-w-5xl rounded-md border p-12 shadow-2xl'>
          {/* Post Title */}
          <h1 className='font-larasoft text-primary mb-8 text-center text-6xl'>
            مقالات
          </h1>
        </article>
        <div className='mx-auto max-w-4xl px-4 py-12'>
          <div className='grid grid-cols-1 gap-8'>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  href={`/posts/${post.slug}`}
                  key={post.id}
                  className='group bg-primary hover:bg-secondary block rounded-md border p-6 shadow-lg transition-all duration-300'
                >
                  <h3
                    className='text-text group-hover:text-accent text-right text-2xl font-bold transition-colors'
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt?.rendered ?? '',
                    }}
                    className='text-text/70 mt-4 text-right'
                  />
                  <span className='text-accent mt-4 block text-right font-medium'>
                    ادامه مطلب &larr;
                  </span>
                </Link>
              ))
            ) : (
              <p className='text-text/70 text-center'>No posts found.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
