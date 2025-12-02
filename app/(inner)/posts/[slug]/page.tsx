import React from 'react';
import Image from 'next/image';
import { getPostList, getPost } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MagneticButton } from '@/components/magnetic-button';
import DotPattern from '@/components/ui/dot-pattern';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPostList();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title.rendered} | LaraSoft Blog`,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160),
    openGraph: {
      images: post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        ? [post._embedded['wp:featuredmedia'][0].source_url]
        : [],
    },
  };
}

export default async function PostSinglePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  // Extract featured image safely
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <main className='animate-in fade-in slide-in-from-bottom-8 min-h-screen w-dvw px-6 pt-32 pb-20 duration-700 md:px-12'>
      <article className='bg-background/20 border-accent/30 mx-auto max-w-3xl rounded-2xl border px-5 py-5 backdrop-blur-2xl'>
        <DotPattern className='rounded-2xl' />
        <header className='mb-12 text-center'>
          <div className='border-foreground/10 bg-foreground/5 mb-6 inline-flex items-center justify-center gap-2 rounded-full border px-4 py-1.5'>
            <span className='bg-accent h-2 w-2 animate-pulse rounded-full' />
            <span className='font-space text-foreground/70 text-xs uppercase'>
              {post.acf?.category ? String(post.acf.category) : 'Blog'}
            </span>
          </div>

          <h1
            className='font-vazirmatn text-foreground mb-8 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl'
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* Hero Image */}
          {featuredImage && (
            <div className='border-foreground/10 relative mb-12 aspect-video w-full overflow-hidden rounded-3xl border shadow-2xl'>
              <Image
                src={featuredImage}
                alt={post.title.rendered}
                fill
                className='object-cover'
                priority
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div
          className='font-vazirmatn text-foreground/80 prose prose-invert prose-lg prose-headings:text-foreground prose-strong:text-accent prose-a:text-accent prose-blockquote:border-accent prose-img:rounded-xl prose-img:border prose-img:border-foreground/10 max-w-none text-lg leading-loose'
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <hr className='border-foreground/10 my-16' />

        {/* Navigation */}
        <div className='flex items-center justify-between'>
          <MagneticButton variant='ghost' href='/posts'>
            ← بازگشت به مقالات
          </MagneticButton>
        </div>
      </article>
    </main>
  );
}
