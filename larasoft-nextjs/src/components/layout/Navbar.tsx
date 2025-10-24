// src/components/Navbar.tsx
'use client';

import React, { Fragment, useState, FC } from 'react';

const Link: FC<
  React.ComponentProps<'a'> & { href: string; className?: string }
> = ({ href, children, className, ...props }) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);
const Image: FC<
  React.ComponentProps<'img'> & {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }
> = ({ src, alt, width, height, className, ...props }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    {...props}
  />
);

import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import {
  BoltIcon,
  ChartBarIcon,
  CpuChipIcon,
  ShieldCheckIcon,
} from '@heroicons/react/20/solid';

import { WpMenuItem, WpAcfOptions } from '@/lib/wordpress';

interface NavbarProps {
  menuItems: WpMenuItem[];
  siteOptions: WpAcfOptions | null;
}

// --- SHADCN MOCKS (REQUIRED FOR SINGLE-FILE EXECUTION) ---

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
  variant?: 'default' | 'secondary' | 'ghost' | 'outline';
  asChild?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  variant = 'default',
  children,
  asChild = false,
  ...props
}) => {
  let baseStyle =
    'inline-flex items-center rounded-full justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2';
  let variantStyle = '';

  switch (variant) {
    case 'secondary':
      variantStyle =
        'bg-secondary text-secondary-foreground hover:bg-secondary/80' ;
      break;
    case 'ghost':
      variantStyle = 'hover:bg-accent hover:text-accent-foreground';
      break;
    case 'outline':
      variantStyle =
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
      break;
    default: // default/primary
      variantStyle =
        'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md';
  }

  // FIX: Correctly handle props when asChild is true to prevent type conflict
  if (asChild) {
    // Destructure button-specific props (like ref) to ensure only generic props are passed to <div>
    const { onClick, disabled, type, ...divProps } = props;

    // Cast remaining props to HTMLAttributes<HTMLDivElement> for type safety on the <div> element
    return (
      <div
        className={`${baseStyle} ${variantStyle} ${className}`}
        {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  // If not asChild, render as a button with its native props
  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...(props as React.ComponentPropsWithoutRef<'button'>)}
    >
      {children}
    </button>
  );
};

/**
 * Custom function to style links like shadcn's NavigationMenuLink,
 * applied to both simple links and Popover.Button elements.
 */
const NavigationMenuLinkStyle = (isActive: boolean = false) =>
  `block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors
   ${isActive ? 'bg-accent/50 text-accent-foreground' : 'text-foreground hover:bg-accent hover:text-accent-foreground'}
   focus:shadow-md focus:outline-none`;

// --- Icon mapping for your services ---
const serviceIcons: { [key: string]: React.ElementType } = {
  'network-support': BoltIcon,
  'web-development': CpuChipIcon,
  cybersecurity: ShieldCheckIcon,
  hosting: ChartBarIcon,
  default: ChartBarIcon,
};
const siteUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || '';

export default function Navbar({ menuItems, siteOptions }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // openPopover is typed to hold the numerical ID of the opened menu item, or null
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  // Placeholder siteUrl since we are in a single file component context
  const siteUrl: string = 'http://larasoft.com';

  // Helper for mobile links
  const renderLink = (item: WpMenuItem) => {
    const path = item.url.replace(siteUrl, '') || '/';
    return (
      <Link
        href={path}
        className='text-foreground hover:bg-muted/70 -mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-medium'
        onClick={() => setMobileMenuOpen(false)}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <>
      <nav
        className='flex w-full items-center justify-between px-3 py-2'
        aria-label='Global'
      >
        {/* 1. LOGO */}
        <div className='flex-shrink-0 pr-4'>
          <Link
            href='/'
            className='text-primary hover:text-accent transition-colors'
          >
            {siteOptions?.site_logo?.url ? (
              <Image
                src={siteOptions.site_logo.url}
                alt={siteOptions.site_logo.alt || 'LaraSoft Logo'}
                width={112}
                height={40}
                className='h-10 w-auto' // Height set to 40px for better visibility
              />
            ) : (
              <span className='font-larasoft text-2xl font-extrabold tracking-wider'>
                LaraSoft
              </span>
            )}
          </Link>
        </div>

        {/* 2. MOBILE MENU BUTTON (Hamburger) */}
        <div className='flex md:hidden'>
          <Button
            variant='ghost'
            className='text-foreground/80 hover:bg-muted/50 p-2.5'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </Button>
        </div>

        {/* --- Right-aligned layout --- */}
        <div className='hidden items-center gap-x-2 md:flex'>
          {/* 3. DESKTOP NAVIGATION (Mimics shadcn NavigationMenu) */}
          <Popover.Group className='hidden md:flex md:gap-x-1'>
            {menuItems && menuItems.length > 0 ? (
              menuItems.map((item: WpMenuItem) => {
                const hasChildren = item.children && item.children.length > 0;
                const itemPath = item.url.replace(siteUrl, '') || '/';

                // --- A. DROPDOWN (Mimics NavigationMenuItem with Content) ---
                if (hasChildren) {
                  return (
                    <Popover
                      key={item.ID}
                      className='relative h-10' // Ensures vertical alignment with CTA button
                      onMouseEnter={() => setOpenPopover(item.ID)}
                      onMouseLeave={() => setOpenPopover(null)}
                    >
                      {/* NavigationMenuTrigger equivalent */}
                      <Popover.Button
                        className={`flex h-full items-center gap-x-1 px-3 py-2 text-base font-medium transition-colors outline-none ${NavigationMenuLinkStyle()}`}
                      >
                        {item.title}
                        <ChevronDownIcon
                          className={`h-4 w-4 transition duration-200 ${openPopover === item.ID ? 'rotate-180' : ''}`}
                          aria-hidden='true'
                        />
                      </Popover.Button>

                      {/* NavigationMenuContent equivalent */}
                      <Transition
                        as={Fragment}
                        show={openPopover === item.ID}
                        enter='transition ease-out duration-200'
                        enterFrom='opacity-0 translate-y-1'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition ease-in duration-150'
                        leaveFrom='opacity-100 translate-y-0'
                        leaveTo='opacity-0 translate-y-1'
                      >
                        <Popover.Panel
                          static
                          className='absolute -left-1/2 z-10 mt-2.5 flex w-screen max-w-max -translate-x-1/2 px-4 rtl:right-1/2 rtl:translate-x-1/2'
                        >
                          <div className='bg-popover text-popover-foreground ring-border w-screen max-w-md flex-auto overflow-hidden rounded-lg text-sm leading-6 shadow-xl ring-1'>
                            <ul className='grid grid-cols-1 gap-1 p-4'>
                              {item.children?.map((child: WpMenuItem) => {
                                const childPath =
                                  child.url.replace(siteUrl, '') || '/';
                                const slug =
                                  childPath.split('/').filter(Boolean).pop() ||
                                  '';
                                const Icon =
                                  serviceIcons[slug] || serviceIcons.default;

                                return (
                                  <li key={child.ID}>
                                    <Link
                                      href={childPath}
                                      className='group hover:bg-secondary flex gap-x-4 rounded-md p-3 transition-colors'
                                    >
                                      <div className='bg-muted group-hover:bg-primary/50 mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-lg'>
                                        <Icon
                                          className='text-primary group-hover:text-accent h-5 w-5'
                                          aria-hidden='true'
                                        />
                                      </div>
                                      <div className='flex-auto text-right'>
                                        <p className='text-foreground font-semibold '>
                                          {child.title}
                                        </p>
                                        {/* Added a description mock for better UX */}
                                        <p className='text-muted-foreground/90 mt-1 text-xs'>
                                          Service description goes here.
                                        </p>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  );
                }

                // --- B. SIMPLE LINK (NavigationMenuLink equivalent) ---
                return (
                  <Link
                    key={item.ID}
                    href={itemPath}
                    className={`h-10 px-3 py-2 text-base font-medium content-center ${NavigationMenuLinkStyle()}`}
                  >
                    {item.title}
                  </Link>
                );
              })
            ) : (
              <span className='text-muted-foreground px-4 text-sm'>
                Loading menu...
              </span>
            )}
          </Popover.Group>

          {/* 4. DESKTOP CTA BUTTON (shadcn Button) */}
          <div className='mr-4 hidden flex-shrink-0 md:flex content-center'>
            <Button
              asChild // use asChild to render Link inside Button
              className=''
            >
              <Link href='/contact'>تماس با ما</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu (shadcn styling) --- */}
      <Dialog
        as='div'
        className='md:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-50 bg-black/30' />

        {/* Floating panel (positioned and styled like a modern mobile drawer) */}
        <Dialog.Panel className='bg-card text-card-foreground ring-border fixed inset-x-4 top-4 z-50 max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-2xl ring-1'>
          {/* Close Button */}
          <div className='flex justify-end'>
            <Button
              variant='ghost'
              className='text-foreground hover:bg-muted/70 -m-2.5 rounded-md p-2.5'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </Button>
          </div>

          <div className='mt-6 flow-root'>
            <div className='divide-border -my-6 divide-y'>
              <div className='space-y-2 py-6'>
                {menuItems && menuItems.length > 0 ? (
                  menuItems.map((item: WpMenuItem) =>
                    !item.children || item.children.length === 0 ? (
                      <Fragment key={item.ID}>{renderLink(item)}</Fragment>
                    ) : (
                      <Disclosure as='div' key={item.ID} className='-mx-3'>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className='text-foreground hover:bg-muted/70 flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base leading-7 font-medium'>
                              {item.title}
                              <ChevronDownIcon
                                className={`${open ? 'rotate-180' : ''} text-muted-foreground h-5 w-5 flex-none transition-transform`}
                                aria-hidden='true'
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className='mt-2 space-y-2 pr-3'>
                              {item.children?.map((child: WpMenuItem) => (
                                <Link
                                  key={child.ID}
                                  href={child.url.replace(siteUrl, '') || '/'}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className='text-muted-foreground/90 hover:bg-muted/70 block rounded-lg py-2 pr-3 pl-6 text-sm leading-7'
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )
                  )
                ) : (
                  <span className='text-muted-foreground block px-3 text-sm'>
                    Loading menu...
                  </span>
                )}
              </div>
              <div className='py-6'>
                <Button
                  asChild
                  className='bg-accent text-accent-foreground hover:bg-accent/80 h-10 w-full transition-colors'
                >
                  <Link
                    href='/contact'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    تماس با ما
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
