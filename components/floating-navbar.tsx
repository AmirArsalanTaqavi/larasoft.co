'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LogoInline, Pattern } from '@/components/svgs';
import { MagneticButton } from '@/components/magnetic-button';
import { Menu, X } from 'lucide-react';
import { NormalizedService, NormalizedPost } from '@/lib/wordpress';
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
  services: NormalizedService[];
  posts: NormalizedPost[];
}

export function FloatingNavbar({
  className,
  services,
  posts,
}: FloatingNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          'fixed top-6 right-0 left-0 z-50 flex justify-center transition-all duration-500',
          className
        )}
      >
        <nav className='border-foreground/10 bg-secondary/60 hover:bg-secondary/80 mx-4 flex w-11/12 items-center justify-between gap-4 rounded-full border py-3 pr-7 pl-5 shadow-lg backdrop-blur-xl transition-all sm:w-11/12 md:w-11/12 md:min-w-[600px] lg:w-9/12 lg:min-w-[700px]'>
                <Pattern className="text-accent -z-10 opacity-40" />
          
          {/* Logo */}
          <Link
            href='/'
            className='text-foreground hover:text-accent z-50 flex shrink-0 items-center transition-colors'
          >
            <LogoInline className='h-8 w-auto' />
          </Link>

          {/* Desktop Menu */}
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
                      {services.map((service) => (
                        <ListItem
                          key={service.slug}
                          title={service.title}
                          href={`/services/${service.slug}`}
                        >
                          <span className='text-xs opacity-70'>
                            {service.category}
                          </span>
                        </ListItem>
                      ))}
                      <li className='border-foreground/10 col-span-2 mt-2 border-t pt-2'>
                        <NavigationMenuLink asChild>
                          <Link
                            href='/services'
                            className='hover:bg-accent hover:text-accent-foreground font-vazirmatn text-accent block rounded-md p-2 text-center text-sm font-medium transition-colors select-none'
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
                      {posts.map((post) => (
                        <ListItem
                          key={post.slug}
                          title={post.title}
                          href={`/posts/${post.slug}`}
                        >
                          {post.excerpt}
                        </ListItem>
                      ))}
                      <li className='border-foreground/10 mt-2 border-t pt-2'>
                        <NavigationMenuLink asChild>
                          <Link
                            href='/posts'
                            className='hover:bg-accent hover:text-accent-foreground font-vazirmatn text-accent block rounded-md p-2 text-center text-sm font-medium transition-colors select-none'
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

          {/* Mobile Menu Toggle */}
          <div className='z-50 md:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='text-foreground p-2'
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* CTA Button (Desktop Only) */}
          <div className='hidden shrink-0 md:block'>
            <MagneticButton variant='white' href='/contact'>
              شروع پروژه
            </MagneticButton>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'bg-background/60 fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 backdrop-blur-xl transition-all duration-500 md:hidden',
          isMobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        <nav className='font-vazirmatn flex flex-col items-center gap-6 text-xl'>
                
          
          <Link
            href='/'
            onClick={() => setIsMobileMenuOpen(false)}
            className='hover:text-accent transition-colors'
          >
            خانه
          </Link>
          <Link
            href='/services'
            onClick={() => setIsMobileMenuOpen(false)}
            className='hover:text-accent transition-colors'
          >
            سرویس‌ها
          </Link>
          <Link
            href='/posts'
            onClick={() => setIsMobileMenuOpen(false)}
            className='hover:text-accent transition-colors'
          >
            مقالات
          </Link>
          <Link
            href='/about'
            onClick={() => setIsMobileMenuOpen(false)}
            className='hover:text-accent transition-colors'
          >
            درباره ما
          </Link>
          <Link
            href='/contact'
            onClick={() => setIsMobileMenuOpen(false)}
            className='hover:text-accent transition-colors'
          >
            تماس با ما
          </Link>
        </nav>

        <div className='mt-8'>
          <MagneticButton variant='accent' size='lg' href='/contact'>
            شروع پروژه
          </MagneticButton>
        </div>
      </div>
    </>
  );
}

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
