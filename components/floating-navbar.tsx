'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogoInline } from './svgs';
import { WpMenuItem, WpAcfOptions } from '@/lib/wordpress';

interface NavbarProps {
  menuItems?: WpMenuItem[];
  siteOptions?: WpAcfOptions | null;
  textDark?: boolean;
}
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

import { useState } from 'react';
import { MagneticButton } from './magnetic-button';

export function FloatingNavbar({
  menuItems = [],
  siteOptions = null,
  textDark = false,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const baseUrl =
    process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || 'http://larasoft.com';
  const posts = [
    { id: 1, slug: 'new-tech', title: 'آینده وب' },
    { id: 2, slug: 'ai-impact', title: 'هوش مصنوعی در توسعه' },
    { id: 3, slug: 'our-process', title: 'فرایند طراحی ما' },
  ];

  return (
    <nav className='fixed top-0 right-0 left-0 z-50 px-4 py-4'>
      <div className='bg-secondary/50 border-background/30 mx-auto max-w-7xl rounded-md border px-6 py-4 backdrop-blur-sm'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='text-foreground flex items-center'>
            <LogoInline className='hover:text-accent w-40 drop-shadow-[0_0_10px_#ffffff60] transition-colors hover:drop-shadow-[0_0_10px_#cedc0060]' />
          </Link>

          {/* Desktop Navigation */}
          <div className='font-vazirmatn hidden items-center gap-8 md:flex'>
            <NavigationMenu>
              <NavigationMenuList className='flex-wrap'>
                {menuItems.length > 0 ? (
                  menuItems.map((item) => {
                    return (
                      <NavigationMenuItem
                        key={item.ID}
                        className='hidden md:block'
                      >
                        {item.children && item.children.length > 0 ? (
                          <>
                            <NavigationMenuTrigger className='bg-transparent'>
                              <Link href={item.url.replace(baseUrl, '')}>
                                {item.title}
                              </Link>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              {/* position the dropdown under the button */}
                              <ul className='grid w-[200px] gap-4'>
                                {item.children.map((child) => (
                                  <li key={child.ID}>
                                    <NavigationMenuLink
                                      asChild
                                      key={child.ID}
                                      className='hover:bg-secondary/80 relative flex justify-end gap-3 rounded-md p-2 transition-colors'
                                    >
                                      <Link
                                        href={child.url.replace(baseUrl, '')}
                                        className=''
                                      >
                                        {child.title}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink
                            asChild
                            className={'bg-transparent'}
                          >
                            <Link href={item.url.replace(baseUrl, '')}>
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    );
                  })
                ) : (
                  <p>No menu items available</p>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA */}
          <MagneticButton
            className='font-vazirmatn bg-foreground hover:bg-accent text-black'
            href='/contact'
            variant='white'
          >
            شروع
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
}
