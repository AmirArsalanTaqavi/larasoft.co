'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LogoInline } from '@/components/svgs';
import { MagneticButton } from '@/components/magnetic-button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import DotPattern from './ui/dot-pattern';

interface FloatingNavbarProps {
  className?: string;
}

export function FloatingNavbar({ className }: FloatingNavbarProps) {
  const [recentPosts, setRecentPosts] = useState<
    { title: string; slug: string; excerpt: string }[]
  >([]);
  const [recentServices, setRecentServices] = useState<
    { title: string; slug: string; excerpt: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
        if (!apiUrl) return;

        // Fetch Posts
        const postsRes = await fetch(`${apiUrl}/wp/v2/posts?per_page=3&_embed`);
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          setRecentPosts(
            postsData.map((post: any) => ({
              title: post.title.rendered,
              slug: post.slug,
              excerpt:
                post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 50) +
                '...',
            }))
          );
        }

        // Fetch Services (Limit to 4 for the dropdown)
        const servicesRes = await fetch(
          `${apiUrl}/wp/v2/services?per_page=4&_embed`
        );
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setRecentServices(
            servicesData.map((service: any) => ({
              title: service.title.rendered,
              slug: service.slug,
              // Use ACF description or fallback to excerpt
              excerpt:
                (service.acf?.description || service.excerpt?.rendered || '')
                  .replace(/<[^>]+>/g, '')
                  .slice(0, 60) + '...',
            }))
          );
        }
      } catch (error) {
        console.error('Failed to fetch menu data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={cn(
        // CHANGED: Removed conditional translation/opacity. Always visible at top-6.
        'fixed top-6 right-0 left-0 z-50 flex justify-center transition-all duration-500',
        className
      )}
    >
      <nav className='border-foreground/10 bg-secondary/60 hover:bg-secondary/80 mx-4 flex w-8/12 items-center justify-between gap-4 rounded-full border py-3 pr-6 pl-4 shadow-lg backdrop-blur-xl transition-all md:min-w-[600px] lg:min-w-[700px]'>
        {/* Logo */}
        <Link
          href='/'
          className='hover:text-accent text-foreground flex shrink-0 items-center transition-colors'
        >
          <LogoInline className='h-8 w-auto' />
        </Link>

        {/* Menu Items */}
        <div className='hidden flex-1 px-4 md:block'>
          <NavigationMenu className='mx-auto' dir='rtl'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href='/'
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'font-vazirmatn bg-transparent text-base'
                    )}
                  >
                    خانه
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className='font-vazirmatn bg-transparent text-base'>
                  سرویس‌ها
                </NavigationMenuTrigger>
                <NavigationMenuContent className='backdrop-blur-2xl'>
                  <DotPattern />
                  <ul className='grid w-[300px] gap-2 p-4 md:w-[400px] md:grid-cols-2'>
                    {recentServices.length > 0 ? (
                      recentServices.map((service) => (
                        <ListItem
                          key={service.slug}
                          title={service.title}
                          href={`/services/${service.slug}`}
                        >
                          {service.excerpt}
                        </ListItem>
                      ))
                    ) : (
                      <li className='text-muted-foreground col-span-2 p-2 text-center text-sm'>
                        در حال بارگذاری...
                      </li>
                    )}

                    {/* View All Services Button */}
                    <li className='border-foreground/10 col-span-2 mt-2 border-t pt-2'>
                      <NavigationMenuLink asChild>
                        <Link
                          href='/services'
                          className='hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground font-vazirmatn text-accent block rounded-md p-2 text-center text-sm font-medium transition-colors select-none'
                        >
                          مشاهده همه سرویس‌ها
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className='font-vazirmatn bg-transparent text-base'>
                  مقالات
                </NavigationMenuTrigger>
                <NavigationMenuContent className='backdrop-blur-2xl'>
                  <DotPattern />
                  <ul className='grid w-[300px] gap-2 p-4 md:w-[400px]'>
                    {recentPosts.length > 0 ? (
                      recentPosts.map((post) => (
                        <ListItem
                          key={post.slug}
                          title={post.title}
                          href={`/posts/${post.slug}`}
                        >
                          {post.excerpt}
                        </ListItem>
                      ))
                    ) : (
                      <li className='text-muted-foreground p-2 text-center text-sm'>
                        در حال بارگذاری...
                      </li>
                    )}
                    <li className='border-foreground/10 mt-2 border-t pt-2'>
                      <NavigationMenuLink asChild>
                        <Link
                          href='/posts'
                          className='hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground font-vazirmatn text-accent block rounded-md p-2 text-center text-sm font-medium transition-colors select-none'
                        >
                          مشاهده همه مقالات
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href='/about'
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'font-vazirmatn bg-transparent text-base'
                    )}
                  >
                    درباره ما
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href='/contact'
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'font-vazirmatn bg-transparent text-base'
                    )}
                  >
                    تماس با ما
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA Button */}
        <div className='shrink-0'>
          <MagneticButton variant='white' href='/contact'>
            شروع پروژه
          </MagneticButton>
        </div>
      </nav>
    </div>
  );
}

// Default export for backward compatibility if needed, but prefer named import
export default FloatingNavbar;

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || '#'}
          ref={ref as any}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
            className
          )}
          {...props}
        >
          <div className='font-vazirmatn text-sm leading-none font-medium'>
            {title}
          </div>
          <p className='text-muted-foreground font-vazirmatn line-clamp-2 text-sm leading-snug opacity-70'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
