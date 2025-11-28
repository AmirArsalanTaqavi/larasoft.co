'use client';

import { usePathname } from 'next/navigation';
import { FloatingNavbar } from '@/components/floating-navbar';
import { WpMenuItem } from '@/lib/wordpress';

interface Props {
  menuItems: WpMenuItem[];
}

export default function NavbarClient({ menuItems }: Props) {
  const pathname = usePathname();

  const isHome = pathname === '/';

  return <>{isHome ? <div></div> : <FloatingNavbar menuItems={menuItems} />}</>;
}
