'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { MagneticButton } from '@/components/magnetic-button';
import DotPattern from '@/components/ui/dot-pattern';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='text-foreground relative flex h-screen w-full flex-col items-center justify-center space-y-8 px-4'>
      <div className='space-y-4 text-center'>
        <DotPattern className='rounded-2xl' />
        <h2 className='font-vazirmatn text-3xl font-bold text-red-500 md:text-4xl'>
          متاسفانه مشکلی پیش آمده است
        </h2>
        <p className='font-space text-foreground/60 mx-auto max-w-md'>
          Something went wrong. Don't worry, it's not you, it's us.
        </p>
      </div>

      <div className='flex flex-col items-center gap-4 md:flex-row'>
        <button
          onClick={() => reset()}
          className='font-vazirmatn border-foreground/20 hover:bg-foreground/10 hover:border-foreground/40 rounded-full border px-8 py-3 transition-all active:scale-95'
        >
          تلاش مجدد
        </button>
        <MagneticButton variant='white' href='/'>
          بازگشت به خانه
        </MagneticButton>
      </div>
    </div>
  );
}
