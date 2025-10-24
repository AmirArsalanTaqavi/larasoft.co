// src/app/posts/page.tsx

import { getPosts } from '@/lib/wordpress';
import Link from 'next/link';

export default async function BlogIndexPage() {
  // This currently fetches up to 6 posts, we'll address that next.
  const posts = await getPosts(); 

  return (
    <main className="p-10 pt-26"> 
      <article className="max-w-5xl mx-auto bg-accent p-12 rounded-xl shadow-2xl relative z-20"> 
        {/* Post Title */}
          <h1 className="text-6xl font-larasoft text-primary mb-8 text-center">
        مقالات
      </h1>
      </article>
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link 
              href={`/posts/${post.slug}`} 
              key={post.id} 
              className="group block p-6 rounded-lg shadow-lg bg-primary border hover:bg-secondary transition-all duration-300"
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
    </main>
  );
}