import Link from 'next/link';
import { MagneticButton } from '@/components/magnetic-button';
import DotPattern from '@/components/ui/dot-pattern';

export default function NotFound() {
  return (
    <div className='text-foreground relative flex h-screen w-full flex-col items-center justify-center overflow-hidden'>
      {/* Giant background text */}
      <h1 className='font-larasoft text-accent/5 pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] leading-none blur-sm select-none md:text-[16rem]'>
        404
      </h1>

      <div className='bg-background/30 animate-in fade-in zoom-in relative z-10 space-y-6 rounded-3xl border border-white/5 p-8 text-center shadow-2xl backdrop-blur-2xl duration-500 md:p-12'>
        <DotPattern className='rounded-2xl' />

        <h1 className='font-space text-4xl'>404</h1>
        <h2 className='font-vazirmatn text-foreground text-3xl font-bold md:text-5xl'>
          صفحه مورد نظر پیدا نشد
        </h2>
        <p className='font-space text-foreground/60 text-lg tracking-widest uppercase'>
          Page Not Found
        </p>

        <div className='flex justify-center pt-8'>
          <MagneticButton variant='primary' size='lg' href='/'>
            بازگشت به خانه
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
