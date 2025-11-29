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
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
  yoast_head_json?: {
    title: string;
    description?: string;
    og_title?: string;
    og_description?: string;
    og_image?: { url: string }[];
  };
}

export interface WpPostAcf {
  hero_title?: string;
  hero_subtitle?: string;
  hero_button_text?: string;
  hero_button_link?: string;
  services_section_title?: string;
  posts_section_title?: string;
  category?: string;
  icon?: string; // For services if you add an icon field
  [key: string]:
    | Record<string, unknown>
    | string
    | number
    | boolean
    | null
    | undefined;
}

export interface WpMenuItem {
  ID: number;
  id: number;
  title: string;
  url: string;
  children?: WpMenuItem[];
}

// --- API CONFIG ---
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// --- FETCH HELPERS ---
async function fetchWp<T>(endpoint: string, revalidate: number): Promise<T[]> {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/wp/v2/${endpoint}`, {
      next: { revalidate },
    });

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

// --- ACF OPTIONS ---
export async function getAcfOptions(): Promise<WpAcfOptions | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/acf/v3/options/options`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.acf;
  } catch (error) {
    console.error('Error fetching ACF options:', error);
    return null;
  }
}

// --- MENU ITEMS ---
function mapMenuItems(items: any[]): WpMenuItem[] {
  if (!Array.isArray(items)) return [];

  return items.map((item: any) => ({
    ...item,
    ID: item.id || item.ID,
    children: item.children ? mapMenuItems(item.children) : [],
  }));
}

export async function getMenuItems(menuId: number): Promise<WpMenuItem[]> {
  if (!API_URL) return [];

  try {
    const res = await fetch(`${API_URL}/wp-api-menus/v2/menus/${menuId}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Failed menu fetch ID: ${menuId}`, await res.text());
      return [];
    }

    const menu = await res.json();
    return mapMenuItems(menu.items || []);
  } catch (error) {
    console.error(`Error fetching menu ID ${menuId}:`, error);
    return [];
  }
}

// --- POSTS, PAGES, SERVICES ---
export async function getPosts(): Promise<WpPost[]> {
  return fetchWp<WpPost>('posts?_embed&per_page=10', 3600); // Increased limit for blog page
}

export async function getPages(): Promise<WpPost[]> {
  return fetchWp<WpPost>('pages?_embed&per_page=20', 3600);
}

export async function getServices(): Promise<WpPost[]> {
  return fetchWp<WpPost>('services?_embed&per_page=20', 3600);
}

// --- NORMALIZED SERVICES ---
export interface NormalizedService {
  number: string;
  title: string;
  category: string;
  slug: string;
  direction: 'left' | 'right';
  icon?: string; // Placeholder for future icon logic
}

export function normalizeServices(services: WpPost[]): NormalizedService[] {
  return services.map((service, index) => ({
    number: (index + 1).toString().padStart(2, '0'),
    title: service.title?.rendered || '',
    category: String(service.acf?.category ?? 'Service'),
    slug: service.slug || '',
    direction: index % 2 === 0 ? 'left' : 'right',
    icon: String(service.acf?.icon ?? ''),
  }));
}

export async function getServiceList(): Promise<NormalizedService[]> {
  const serviceList = await getServices();
  return normalizeServices(serviceList);
}

// --- NORMALIZED POSTS ---
export interface NormalizedPost {
  number: string;
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  image: string | null; // Added Image field
  direction: 'left' | 'right' | 'top' | 'bottom';
}

export function normalizePosts(posts: WpPost[]): NormalizedPost[] {
  return posts.map((post, index) => {
    // Strip HTML tags from excerpt for cleaner UI
    const rawExcerpt = post.excerpt?.rendered || '';
    const cleanExcerpt =
      rawExcerpt.replace(/<[^>]+>/g, '').slice(0, 100) + '...';

    // Extract Featured Image
    const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

    // Assign varying directions for visual interest
    const directions: Array<'left' | 'right' | 'top' | 'bottom'> = [
      'top',
      'right',
      'left',
      'bottom',
    ];

    return {
      number: (index + 1).toString().padStart(2, '0'),
      title: post.title?.rendered || '',
      excerpt: cleanExcerpt,
      category: String(post.acf?.category ?? 'Blog'),
      slug: post.slug || '',
      image,
      direction: directions[index % 4] || 'top',
    };
  });
}

export async function getPostList(): Promise<NormalizedPost[]> {
  const posts = await getPosts();
  return normalizePosts(posts);
}

// --- FETCH ITEM BY SLUG ---
export async function getItemBySlug(
  slug: string,
  type: 'posts' | 'pages' | 'services'
): Promise<WpPost | null> {
  const items = await fetchWp<WpPost>(
    `${type}?slug=${slug}&_embed`,
    type === 'posts' ? 60 : 3600
  );
  return items[0] || null;
}
