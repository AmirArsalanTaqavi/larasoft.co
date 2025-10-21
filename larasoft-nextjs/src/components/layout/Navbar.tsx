'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

// --- Icon mapping for your services ---
const serviceIcons: { [key: string]: React.ElementType } = {
  'network-support': BoltIcon,
  'web-development': CpuChipIcon,
  'cybersecurity': ShieldCheckIcon,
  'hosting': ChartBarIcon,
  default: ChartBarIcon,
};

interface NavbarProps {
  menuItems: WpMenuItem[];
  siteOptions: WpAcfOptions | null;
}

export default function Navbar({ menuItems, siteOptions }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  
  const siteUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || '';

  // Helper for mobile links
  const renderLink = (item: WpMenuItem) => {
    const path = item.url.replace(siteUrl, '') || '/';
    return (
      <Link
        href={path}
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-text-500 hover:bg-primary-500/10"
        onClick={() => setMobileMenuOpen(false)}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <>
      {/* Sizing is set by py-2.5 (10px) + h-8 (32px logo) = 52px total height */}
      <nav className="w-full flex justify-between items-center px-6 py-2.5" aria-label="Global">
        
        {/* 1. LOGO (Cleaned up) */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-accent-500 hover:text-primary-500 transition-colors">
            {siteOptions?.site_logo?.url ? (
              <Image
                src={siteOptions.site_logo.url}
                alt={siteOptions.site_logo.alt || 'LaraSoft Logo'}
                width={112}
                height={32}
                priority
                className="h-8 w-auto" // 32px height
              />
            ) : (
              <span className="text-2xl font-larasoft tracking-wider">LaraSoft</span>
            )}
          </Link>
        </div>

        {/* 2. MOBILE MENU BUTTON (Hamburger) */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text-500"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* --- Right-aligned layout --- */}
        <div className="hidden md:flex items-center gap-x-2">
          
          {/* 3. DESKTOP NAVIGATION */}
          <Popover.Group className="hidden md:flex md:gap-x-1">
            {menuItems && menuItems.length > 0 ? (
              menuItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const itemPath = item.url.replace(siteUrl, '') || '/';

                // --- A. DROPDOWN (Mega Menu) ---
                if (hasChildren) {
                  return (
                    <Popover
                      key={item.ID}
                      className="relative"
                      onMouseEnter={() => setOpenPopover(item.ID)}
                      onMouseLeave={() => setOpenPopover(null)}
                    >
                      <Popover.Button
                        // FIX: Hover color is now accent
                        className="flex items-center gap-x-1 rounded-full py-1 px-3 text-base font-medium text-text-500 hover:text-accent-500 hover:bg-white/10 transition-colors outline-none"
                      >
                        {item.title}
                        <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        show={openPopover === item.ID}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel
                          static
                          className="absolute -left-1/2 rtl:right-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 rtl:translate-x-1/2 px-4"
                        >
                          {/* --- FIX: Dropdown background --- */}
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-surface-500/90 backdrop-blur-sm text-sm leading-6 shadow-lg ring-1 ring-primary-500/10">
                            <div className="p-4 grid grid-cols-1 gap-2">
                              {item.children?.map((child) => {
                                const childPath = child.url.replace(siteUrl, '') || '/';
                                const slug = childPath.split('/').filter(Boolean).pop() || '';
                                const Icon = serviceIcons[slug] || serviceIcons.default;
                                
                                return (
                                  <Link
                                    key={child.ID}
                                    href={childPath}
                                    className="group relative flex gap-x-4 rounded-xl p-3 hover:bg-accent-500/50 transition-colors"
                                  >
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-background-500 group-hover:bg-primary-500">
                                      <Icon className="h-6 w-6 text-accent-500 group-hover:text-text-500" aria-hidden="true" />
                                    </div>
                                    {/* --- FIX: Text alignment --- */}
                                    <div className="text-right flex-auto">
                                      <span className="font-semibold text-text-500">
                                        {child.title}
                                      </span>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  );
                }

                // --- B. SIMPLE LINK ---
                return (
                  <Link
                    key={item.ID}
                    href={itemPath}
                    // FIX: Hover color is now accent
                    className="rounded-full py-1 px-3 text-base font-medium text-text-500 hover:text-accent-500 hover:bg-white/10 transition-colors"
                  >
                    {item.title}
                  </Link>
                );
              })
            ) : (
              <span className="px-4 text-sm text-yellow-400">Loading menu...</span>
            )}
          </Popover.Group>

          {/* 4. DESKTOP CTA BUTTON (Your fix from V4) */}
          <div className="hidden md:flex flex-shrink-0">
            <Link
              href="/contact"
              className="rounded-full bg-accent-500 px-5 py-1 text-base font-medium text-background-500 shadow-lg hover:bg-primary-500 transition-colors"
            >
              تماس با ما
            </Link>
          </div>
        </div>
      </nav>

      {/* --- FIX: Mobile Menu (Completely rebuilt) --- */}
      <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        
        {/* Floating panel, not full-width, with blur and background */}
        <Dialog.Panel className="fixed inset-x-4 top-20 z-50 rounded-2xl bg-surface-500/90 backdrop-blur-lg p-6 shadow-xl ring-1 ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">LaraSoft</span>
              {siteOptions?.site_logo?.url ? (
                <Image
                  src={siteOptions.site_logo.url}
                  alt={siteOptions.site_logo.alt || 'LaraSoft Logo'}
                  width={112}
                  height={32}
                  priority
                  className="h-8 w-auto"
                />
              ) : (
                <span className="text-2xl font-larasoft tracking-wider text-accent-500">LaraSoft</span>
              )}
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-text-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {menuItems && menuItems.length > 0 ? (
                  menuItems.map((item) =>
                    !item.children || item.children.length === 0 ? (
                      <Fragment key={item.ID}>{renderLink(item)}</Fragment>
                    ) : (
                      <Disclosure as="div" key={item.ID} className="-mx-3">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-medium leading-7 text-text-500 hover:bg-primary-500/10">
                              {item.title}
                              <ChevronDownIcon
                                className={`${open ? 'rotate-180' : ''} h-5 w-5 flex-none transition-transform`}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-2 space-y-2 pr-3">
                              {item.children?.map((child) => (
                                <Link
                                  key={child.ID}
                                  href={child.url.replace(siteUrl, '') || '/'}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm leading-7 text-text-500/80 hover:bg-primary-500/10"
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
                  <span className="block px-3 text-sm text-yellow-400">Loading menu...</span>
                )}
              </div>
              <div className="py-6">
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-text-500 hover:bg-primary-500/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  تماس با ما
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}