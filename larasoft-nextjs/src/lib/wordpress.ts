// --- INTERFACES ---

// 1. For standard WP settings (Site Title, etc.)
export interface WpSettings {
  title: string;
  logoUrl?: string;
}

// 2. For your custom ACF options page (Colors, Fonts, etc.)
export interface WpAcfOptions {
  // Branding
  site_logo?: { url: string; alt: string };
  site_logo_dark?: { url: string; alt: string };
  favicon?: { url: string; alt: string };

  // Colors
  color_primary?: string;
  color_secondary?: string;
  color_accent?: string;
  color_text?: string;
  color_background?: string;
  color_surface?: string;

  // Typography
  primary_font_url?: string;
  primary_font_family?: string;
  secondary_font_url?: string;
  secondary_font_family?: string;

  // General
  hero_background_image?: { url: string; alt: string };

  // Footer
  copyright_text?: string;
}

// 3. For a single Post or Page
export interface WpPost {
    id: number;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    acf?: WpPostAcf; // Add this line for ACF fields with a stronger type
}

// Specific ACF shape for posts/pages that we use in the app
export interface WpPostAcf {
  hero_title?: string;
  hero_subtitle?: string;
  hero_button_text?: string;
  hero_button_link?: string;
  services_section_title?: string;
  posts_section_title?: string;
  hero_background_image?: { url: string; alt?: string };
  [key: string]: Record<string, unknown> | string | number | boolean | null | undefined;
}

// 4. For a single Menu Item
export interface WpMenuItem {
  ID: number;
  title: string;
  url: string;
  children?: WpMenuItem[];
}


// --- FETCH FUNCTIONS ---

/**
 * Fetches the standard WordPress site settings (title and logo).
 */
export async function getSiteSettings(): Promise<WpSettings> {
  const apiURL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (!apiURL) return { title: 'LaraSoft' }; // Fallback

  try {
    const settingsRes = await fetch(`${apiURL}/wp/v2/settings`, { next: { revalidate: 3600 } });
    if (!settingsRes.ok) return { title: 'LaraSoft' };
    
    const settings = await settingsRes.json();
    let logoUrl;

    if (settings.site_logo) {
      const mediaRes = await fetch(`${apiURL}/wp/v2/media/${settings.site_logo}`, { next: { revalidate: 3600 } });
      if (mediaRes.ok) {
        const media = await mediaRes.json();
        logoUrl = media.source_url;
      }
    }

    return {
      title: settings.title,
      logoUrl: logoUrl,
    };
  } catch (error) {
    console.error('Fetch error in getSiteSettings:', error);
    return { title: 'LaraSoft' };
  }
}

/**
 * Fetches all custom fields from your ACF Options Page.
 */
export async function getAcfOptions(): Promise<WpAcfOptions | null> {
  const apiURL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (!apiURL) return null;

  try {
    const res = await fetch(`${apiURL}/acf/v3/options/options`, {
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
 * Fetches items from the menu plugin.
 */
export async function getMenuItems(location: string): Promise<WpMenuItem[]> {
  const apiURL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (!apiURL) return [];

  try {
    const res = await fetch(`${apiURL}/wp-rest-api-menus/v2/menu-locations/${location}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    
    const menu = await res.json();
    return menu.items || [];
  } catch (error) {
    console.error(`Fetch error in getMenuItems for ${location}:`, error);
    return [];
  }
}

/**
 * Fetches a list of posts or pages.
 */
async function fetchWp<T>(endpoint: string, revalidate: number): Promise<T[]> {
  const apiURL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (!apiURL) return [];

  try {
    const res = await fetch(`${apiURL}/wp/v2/${endpoint}`, { next: { revalidate } });
    if (!res.ok) return [];
    return res.json() as Promise<T[]>;
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return [];
  }
}

export async function getPosts(): Promise<WpPost[]> {
  return fetchWp<WpPost>('posts?_embed&per_page=6', 60);
}

export async function getPages(): Promise<WpPost[]> {
  return fetchWp<WpPost>('pages?_embed&per_page=10', 3600);
}

export async function getItemBySlug(slug: string, type: 'posts' | 'pages'): Promise<WpPost | null> {
  const items = await fetchWp<WpPost>(`${type}?slug=${slug}&_embed`, type === 'posts' ? 60 : 3600);
  return items[0] || null;
}