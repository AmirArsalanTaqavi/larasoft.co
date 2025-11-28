// src/app/posts/[slug]/page.tsx

import { getItemBySlug, getPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

// 1. Tell Next.js which pages to pre-render
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Define the page component
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Add 'await' here
  const { slug } = await params;
  const post = await getItemBySlug(slug, 'posts');

  if (!post) {
    notFound(); // Triggers the 404 page if no post is found
  }

  return (
    <main className='p-10 pt-30'>
      <article className='bg-accent relative mx-auto max-w-5xl rounded-md p-12 shadow-2xl'>
        {/* Post Title */}
        <h1
          className='font-larasoft text-primary mb-8 text-4xl md:text-6xl'
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </article>
      <article className='prose prose-invert prose-lg mx-auto max-w-4xl px-4 py-12 pt-26'>
        {/* Post Content */}
        <div
          className='text-text/90'
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </main>
  );
}
