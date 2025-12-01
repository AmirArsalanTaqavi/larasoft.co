import { LogoInline } from '@/components/svgs';

export default function Loading() {
  return (
    <div className='bg-background fixed inset-0 z-100 flex items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <LogoInline className='text-accent h-12 w-auto animate-pulse' />
        <div className='bg-foreground/10 h-1 w-32 overflow-hidden rounded-full'>
          <div className='bg-accent animate-progress h-dvh w-dvw origin-left' />
        </div>
      </div>
    </div>
  );
}
