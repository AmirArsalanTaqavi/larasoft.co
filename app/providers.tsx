'use client';

import { ScrollProvider, useScroll } from '@/components/scroll-context';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { scrollContainerRef } = useScroll();

  return (
    <ScrollProvider>
      <div ref={scrollContainerRef} className='min-h-full overflow-y-auto'>
        {children}
      </div>
    </ScrollProvider>
  );
}
