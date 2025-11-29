import { getServiceList, getPostList } from '@/lib/wordpress';
import { HomeClient } from '@/app/home-client';

// Force revalidation every hour so data stays fresh
export const revalidate = 3600;

export default async function Home() {
  // Fetch both in parallel for maximum speed
  const [services, posts] = await Promise.all([
    getServiceList(),
    getPostList(),
  ]);

  return <HomeClient services={services} posts={posts} />;
}
