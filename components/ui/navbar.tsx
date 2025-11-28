import NavbarClient from '@/app/navbar-client';
import { getMenuItems } from '@/lib/wordpress';

export default async function Navbar() {
  // Fetch WP menu #2 server-side
  const menuItems = await getMenuItems(2);

  return <NavbarClient menuItems={menuItems} />;
}
