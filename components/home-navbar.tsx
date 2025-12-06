'use client';

import { LogoInline } from '@/components/svgs';
import { MagneticButton } from '@/components/magnetic-button';

interface HomeNavbarProps {
  isLoaded: boolean;
  currentSection: number;
  scrollToSection: (index: number) => void;
}

export function HomeNavbar({
  isLoaded,
  currentSection,
  scrollToSection,
}: HomeNavbarProps) {
  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button
        onClick={() => scrollToSection(1)}
        className='flex items-center gap-2 transition-transform hover:scale-105'
      >
        <LogoInline className='text-accent h-8 drop-shadow-[0_0_10px_#cedc0060] transition-colors' />
      </button>

      <div className='font-vazirmatn hidden items-center gap-8 md:flex'>
        {['خانه', 'سرویس ها', 'مقالات', 'درباره ما', 'تماس با ما'].map(
          (item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index + 2)} // Logic preserved: index + 2 maps to sections
              className={`group text-md relative font-medium transition-colors ${
                currentSection === index
                  ? 'text-accent'
                  : 'text-accent/70 hover:text-foreground'
              }`}
            >
              {item}
              <span
                className={`bg-foreground absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                  currentSection === index ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          )
        )}
      </div>

      <MagneticButton
        className='font-vazirmatn'
        variant='primary'
        onClick={() => scrollToSection(6)}
      >
        شروع
      </MagneticButton>
    </nav>
  );
}
