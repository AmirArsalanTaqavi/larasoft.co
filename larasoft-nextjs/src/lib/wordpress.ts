// 1. [INTERFACE] Define the structure of a WordPress Post/Page object
// This ensures type safety throughout your Next.js application.
export interface WpPost {
    id: number;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    // You can add more fields here if needed (e.g., featured_media, date)
}

// 2. [UTILITY] Function to get a list of Posts (for Blog/Latest News section)
export async function getPosts(): Promise<WpPost[]> {
    const apiURL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    if (!apiURL) {
        console.error("API URL is not set for getPosts.");
        return [];
    }

    const res = await fetch(`${apiURL}/wp/v2/posts?_embed&per_page=6`, {
        // ISR: Revalidate the post list every 60 seconds
        next: { revalidate: 60 } 
    });

    if (!res.ok) {
        console.error("WordPress API Error Status in getPosts:", res.status);
        return [];
    }
    
    return res.json() as Promise<WpPost[]>;
}

// 3. [UTILITY] Function to get a single Post by its slug
export async function getPost(slug: string): Promise<WpPost | null> {
    const apiURL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    if (!apiURL) return null;

    const res = await fetch(`${apiURL}/wp/v2/posts?slug=${slug}&_embed`, {
        next: { revalidate: 60 }
    });

    if (res.status === 404 || !res.ok) {
        return null;
    }

    const posts = await res.json() as Promise<WpPost[]>;
    // Returns the first (and only) post found, or null if array is empty
    return (await posts)[0] || null; 
}


// 4. [UTILITY] Function to get a list of Pages (for Services/Features section)
export async function getPages(): Promise<WpPost[]> {
    const apiURL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    if (!apiURL) {
        console.error("API URL is not set for getPages.");
        return [];
    }
    
    // Uses the 'pages' endpoint instead of 'posts'
    const res = await fetch(`${apiURL}/wp/v2/pages?_embed&per_page=10`, {
        // Pages change less often, so we cache for longer (1 hour = 3600 seconds)
        next: { revalidate: 3600 } 
    });

    if (!res.ok) {
        console.error("Pages API Error Status in getPages:", res.status);
        return [];
    }
    
    return res.json() as Promise<WpPost[]>;
}

// 5. [UTILITY] Function to get a single Page by its slug (e.g., 'home' or 'contact')
export async function getPageBySlug(slug: string): Promise<WpPost | null> {
    const apiURL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    if (!apiURL) return null;

    // Fetch the page content by its slug
    const res = await fetch(`${apiURL}/wp/v2/pages?slug=${slug}&_embed`, {
        next: { revalidate: 3600 } 
    });

    if (res.status === 404 || !res.ok) {
        return null;
    }

    const pages = await res.json() as Promise<WpPost[]>;
    // Returns the first (and only) page found, or null if array is empty
    return (await pages)[0] || null;
}