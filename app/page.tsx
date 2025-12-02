import { HomeClient } from './home-client';
import { getPostList, getServiceList } from '@/lib/wordpress';

export const revalidate = 60; // Update every minute

export default async function Home() {
  // Simple pass-through: lib already returns normalized data
  const [services, posts] = await Promise.all([
    getServiceList(5),
    getPostList(4),
  ]);

  return <HomeClient services={services} posts={posts} />;
}
