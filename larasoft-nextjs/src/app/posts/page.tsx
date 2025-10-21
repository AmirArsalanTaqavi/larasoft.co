// src/app/posts/page.tsx

import { getPosts } from '@/lib/wordpress';
import Link from 'next/link';

export default async function BlogIndexPage() {
  // This currently fetches up to 6 posts, we'll address that next.
  const posts = await getPosts(); 

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 pt-26">
      <h1 className="text-5xl font-larasoft text-accent mb-12 text-center">
        Blog & A-ha! Moments
      </h1>

      <div className="grid grid-cols-1 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link 
              href={`/posts/${post.slug}`} 
              key={post.id} 
              className="group block p-6 rounded-lg shadow-lg bg-surface border border-text/10 hover:border-accent/50 transition-all duration-300"
            >
              <h3 
                className="text-2xl font-bold text-text group-hover:text-accent transition-colors text-right"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div 
                dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered ?? '' }} 
                className="text-text/70 mt-4 text-right"
              />
              <span className="block text-accent font-medium mt-4 text-right">
                ادامه مطلب &larr;
              </span>
            </Link>
          ))
        ) : (
          <p className="text-text/70 text-center">No posts found.</p>
        )}
      </div>
    </div>
  );
}