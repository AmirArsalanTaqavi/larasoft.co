// src/lib/wordpress.ts

// --- INTERFACES ---
export interface WpSettings {
  title: string;
  logoUrl?: string;
}

export interface WpAcfOptions {
  site_logo?: { url: string; alt: string };
  favicon?: { url: string; alt: string };
  color_primary?: string;
  color_secondary?: string;
  color_accent?: string;
  color_text?: string;
  color_background?: string;
  color_surface?: string;
  hero_background_image?: { url: string; alt: string };
  background_image?: { url: string; alt: string };
  copyright_text?: string;
}

export interface WpPost {
    id: number;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    acf?: WpPostAcf;

    yoast_head_json?: {
      title: string;
      description?: string;
      og_title?: string;
      og_description?: string;
      og_image?: { url: string }[];
      // ... add other yoast fields as needed
    };
}

export interface WpPostAcf {
  hero_title?: string;
  hero_subtitle?: string;
  hero_button_text?: string;
  hero_button_link?: string;
  services_section_title?: string;
  posts_section_title?: string;
  [key: string]: Record<string, unknown> | string | number | boolean | null | undefined;
}

export interface WpMenuItem {
  ID: number; // We will ensure this exists
  id: number;
  title: string;
  url: string;
  children?: WpMenuItem[];
}

// --- FETCH FUNCTIONS ---

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function getAcfOptions(): Promise<WpAcfOptions | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/acf/v3/options/options`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.acf;
  } catch (error) {
    console.error("Error fetching ACF options:", error);
    return null;
  }
}

/**
 * Helper function to recursively fix item keys (id -> ID)
 * This fixes the React "key" prop warning.
 */
function mapMenuItems(items: any[]): WpMenuItem[] {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item: any) => ({
    ...item,
    ID: item.id || item.ID, // Ensure 'ID' exists for React keys
    // Recursively map children as well
    children: item.children ? mapMenuItems(item.children) : [],
  }));
}

/**
 * Fetches menu items by the menu's ID.
 * This is YOUR updated, correct function.
 */
export async function getMenuItems(menuId: number): Promise<WpMenuItem[]> {
  if (!API_URL) {
    console.error("Missing NEXT_PUBLIC_WORDPRESS_API_URL environment variable.");
    return [];
  }

  try {
    // This is the correct endpoint you found with Postman
    const res = await fetch(`${API_URL}/wp-api-menus/v2/menus/${menuId}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch menu ID: ${menuId}`, await res.text());
      return [];
    }

    const menu = await res.json();

    if (!menu || !Array.isArray(menu.items)) {
      console.warn(`Menu ${menuId} has no items or invalid format.`);
      return [];
    }

    // Use the recursive helper to fix keys for all items and children
    return mapMenuItems(menu.items);

  } catch (error) {
    console.error(`Error fetching menu ID ${menuId}:`, error);
    return [];
  }
}

/**
 * Fetches a list of posts, pages, or services.
 */
async function fetchWp<T>(endpoint: string, revalidate: number): Promise<T[]> {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/wp/v2/${endpoint}`, { next: { revalidate } });
    if (!res.ok) {
      console.error(`Fetch failed for endpoint: ${endpoint}`, await res.text());
      return [];
    }
    return res.json() as Promise<T[]>;
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return [];
  }
}

export async function getPosts(): Promise<WpPost[]> {
  // Fetches all posts, not just 6
  return fetchWp<WpPost>('posts?_embed&per_page=100', 60);
}

export async function getPages(): Promise<WpPost[]> {
  return fetchWp<WpPost>('pages?_embed&per_page=10', 3600);
}

/**
 * FIX for page crashes: This function now exists.
 */
export async function getServices(): Promise<WpPost[]> {
  return fetchWp<WpPost>('services?_embed&per_page=10', 3600);
}

/**
 * FIX for page crashes: This function now accepts 'services'.
 */
export async function getItemBySlug(
  slug: string, 
  type: 'posts' | 'pages' | 'services' 
): Promise<WpPost | null> {
  const items = await fetchWp<WpPost>(`${type}?slug=${slug}&_embed`, type === 'posts' ? 60 : 3600);
  return items[0] || null;
}