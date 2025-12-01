'use client';

import { usePathname } from 'next/navigation';
import { FloatingNavbar } from '@/components/floating-navbar';
import { NormalizedService, NormalizedPost } from '@/lib/wordpress';

interface NavbarClientProps {
  services: NormalizedService[];
  posts: NormalizedPost[];
}

export default function NavbarClient({ services, posts }: NavbarClientProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  // If home, we don't render anything (assuming Home has its own nav or layout)
  // If not home, render the FloatingNavbar with the server-fetched data
  return (
    <>{isHome ? null : <FloatingNavbar services={services} posts={posts} />}</>
  );
}
