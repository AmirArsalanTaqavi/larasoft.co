import { MetadataRoute } from 'next';
import { getServiceList, getPostList } from '@/lib/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Replace with your actual domain
  const baseUrl = 'https://larasoft.co';

  // 1. Static Routes
  const routes = ['', '/about', '/contact', '/services', '/posts'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  // 2. Dynamic Services
  const services = await getServiceList();
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Dynamic Blog Posts
  const posts = await getPostList();
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes, ...postRoutes];
}
