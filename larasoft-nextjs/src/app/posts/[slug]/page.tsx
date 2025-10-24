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
export default async function PostPage({ params }: { params: { slug: string } }) {
  // Add 'await' here
  const { slug } = await params;
  const post = await getItemBySlug(slug, 'posts');

  if (!post) {
    notFound(); // Triggers the 404 page if no post is found
  }

  return (
    <main className="p-10 pt-26"> 
      <article className="max-w-5xl mx-auto bg-accent p-12 rounded-xl shadow-2xl relative z-20"> 
        {/* Post Title */}
          <h1 
            className="text-4xl md:text-6xl font-larasoft text-primary mb-8"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
          />
      </article>
    <article className="max-w-4xl mx-auto py-12 px-4 prose prose-invert prose-lg pt-26">
      {/* Post Content */}
      <div 
        className="text-text/90"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
      />

    </article>
    </main>
  );
}