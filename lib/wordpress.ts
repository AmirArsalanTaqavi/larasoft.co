import { notFound } from 'next/navigation';

// --- CONFIG ---
// We use the env var exactly as you have it (http://localhost:8080/wp-json)
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// --- INTERFACES ---
export interface WpSettings {
  title: string;
  logoUrl?: string;
}

export interface WpAcfOptions {
  site_logo?: { url: string; alt: string };
  favicon?: { url: string; alt: string };
  // Mapping your specific ACF fields
  site_title?: string;
  site_description?: string;
  copyright_text?: string;
  og_image?: { url: string } | string;
  apple_icon?: { url: string } | string;
}

export interface WpPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  acf?: any;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      name: string;
      slug: string;
    }>>;
  };
}

// UI Specific Interfaces (Normalized for Frontend)
export interface NormalizedService {
  number: string;
  title: string;
  category: string;
  slug: string;
  direction: 'left' | 'right' | 'top' | 'bottom';
  image: string | null;
}

export interface NormalizedPost {
  number: string;
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  direction: 'left' | 'right' | 'top' | 'bottom';
  image: string | null;
}

// --- FETCH HELPERS ---
async function fetchWp<T>(endpoint: string, revalidate: number = 60): Promise<T[]> {
  if (!API_URL) {
    console.error('❌ API_URL is missing in .env.local');
    return [];
  }
  
  // Logic: API_URL is ".../wp-json", so we append "/wp/v2/..."
  const fullUrl = `${API_URL}/wp/v2/${endpoint}`;

  try {
    const res = await fetch(fullUrl, {
      next: { revalidate },
    });

    if (!res.ok) {
      console.error(`❌ Fetch failed for: ${fullUrl} (${res.status})`);
      return [];
    }

    return res.json() as Promise<T[]>;
  } catch (error) {
    console.error(`❌ Network error for ${fullUrl}:`, error);
    return [];
  }
}

// --- ACF OPTIONS (Global Site Data) ---
export async function getAcfOptions(): Promise<WpAcfOptions | null> {
  if (!API_URL) return null;
  try {
    // For ACF Options, the endpoint is slightly different usually
    const res = await fetch(`${API_URL}/acf/v3/options/options`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.acf || data;
  } catch (error) {
    return null;
  }
}

// --- NORMALIZERS ---
function normalizeServices(services: WpPost[]): NormalizedService[] {
  return services.map((service, index) => {
    // Extract Image from _embedded (requires ?_embed in query)
    const image = service._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    
    // Attempt to find a category name, fallback to 'Service'
    const category = service._embedded?.['wp:term']?.[0]?.[0]?.name || 'Service';

    return {
      number: (index + 1).toString().padStart(2, '0'),
      title: service.title?.rendered || '',
      category: category,
      slug: service.slug || '',
      // Assign direction for animations
      direction: ['left', 'right', 'top', 'bottom'][index % 4] as any,
      image: image,
    };
  });
}

function normalizePosts(posts: WpPost[]): NormalizedPost[] {
  return posts.map((post, index) => {
    // Strip HTML tags from excerpt
    const rawExcerpt = post.excerpt?.rendered || '';
    const cleanExcerpt = rawExcerpt.replace(/<[^>]+>/g, '').slice(0, 100) + '...';

    const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog';

    return {
      number: (index + 1).toString().padStart(2, '0'),
      title: post.title?.rendered || '',
      excerpt: cleanExcerpt,
      category: category,
      slug: post.slug || '',
      direction: ['top', 'right', 'left', 'bottom'][index % 4] as any,
      image: image,
    };
  });
}

// --- MAIN GETTERS ---

export async function getServiceList(limit: number = 10): Promise<NormalizedService[]> {
  // We use your Services CPT endpoint. 
  // IMPORTANT: We add _embed to get the images.
  const services = await fetchWp<WpPost>(`services?_embed&per_page=${limit}`, 60);
  return normalizeServices(services);
}

export async function getPostList(limit: number = 10): Promise<NormalizedPost[]> {
  const posts = await fetchWp<WpPost>(`posts?_embed&per_page=${limit}`, 60);
  return normalizePosts(posts);
}

// --- SINGLE ITEM GETTERS ---
export async function getService(slug: string): Promise<WpPost | null> {
  const items = await fetchWp<WpPost>(`services?slug=${slug}&_embed`, 60);
  return items[0] || null;
}

export async function getPost(slug: string): Promise<WpPost | null> {
  const items = await fetchWp<WpPost>(`posts?slug=${slug}&_embed`, 60);
  return items[0] || null;
}