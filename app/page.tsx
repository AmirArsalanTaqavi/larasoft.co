'use client';

import { ServicesSection } from '@/components/sections/services-section';
import { BlogSection } from '@/components/sections/blog-section';
import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { MagneticButton } from '@/components/magnetic-button';
import { useEffect, useState, useRef } from 'react';
import FloatingLogo from '@/components/floating_logo';
import { useScroll } from '@/components/scroll-context';
import { LogoInline } from '@/components/svgs';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const shaderContainerRef = useRef<HTMLDivElement>(null);
  const scrollThrottleRef = useRef<number>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector('canvas');
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true);
          return true;
        }
      }
      return false;
    };

    if (checkShaderReady()) return;

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId);
      }
    }, 100);

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sections = scrollContainerRef.current.children;
      if (sections[index]) {
        sections[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
        setCurrentSection(index);
      }
    }
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
      container.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentSection]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();

        if (!scrollContainerRef.current || isScrollingRef.current) return;

        scrollContainerRef.current.scrollBy({
          left: -e.deltaY,
          behavior: 'auto',
        });

        const sectionWidth = scrollContainerRef.current.offsetWidth;
        const newSection = Math.round(
          Math.abs(scrollContainerRef.current.scrollLeft) / sectionWidth
        );
        if (newSection !== currentSection) {
          setCurrentSection(newSection);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentSection]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return;

      scrollThrottleRef.current = window.requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = null;
          return;
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth;
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const newSection = Math.round(Math.abs(scrollLeft) / sectionWidth);

        if (
          newSection !== currentSection &&
          newSection >= 0 &&
          newSection <= 4
        ) {
          setCurrentSection(newSection);
        }

        scrollThrottleRef.current = null;
      });
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (scrollThrottleRef.current !== null) {
        cancelAnimationFrame(scrollThrottleRef.current);
      }
    };
  }, [currentSection]);

  return (
    <main className='w-full overflow-hidden'>
      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-dvh overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <nav
          className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => scrollToSection(1)}
            className='flex items-center gap-2 transition-transform hover:scale-105'
          >
            <LogoInline className='text-accent w-40 drop-shadow-[0_0_10px_#cedc0060] transition-colors' />
          </button>

          <div className='font-vazirmatn hidden items-center gap-8 md:flex'>
            {['خانه', 'سرویس ها', 'مقالات', 'درباره ما', 'تماس با ما'].map(
              (item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(index + 2)}
                  className={`group text-md relative font-medium transition-colors ${
                    currentSection === index
                      ? 'text-accent'
                      : 'text-accent/70 hover:text-foreground'
                  }`}
                >
                  {item}
                  <span
                    className={`bg-foreground absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                      currentSection === index
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
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
        <FloatingLogo className='z-0 drop-shadow-[0_0_10px_#cedc0060]' />
        {/* Hero */}
        <section className='z-1 flex min-h-dvh w-dvw shrink-0 flex-col justify-end px-6 pt-24 pb-16 md:px-12 md:pb-24'>
          <div className='max-w-3xl'>
            <div className='animate-in fade-in slide-in-from-bottom-4 border-foreground/20 bg-foreground/15 mb-4 inline-block rounded-full border p-2 backdrop-blur-md duration-700'>
              <p className='font-vazirmatn text-accent text-xs'>خوش آمیدید!</p>
            </div>
            <h1 className='font-larasoft animate-in fade-in slide-in-from-bottom-8 font-accent text-foreground z-0 mb-6 text-6xl leading-[1.1] tracking-tight duration-1000 md:text-7xl lg:text-8xl'>
              <span className='text-accent'>
                لاراسافت
                <br />
                LARA SOFT
              </span>
            </h1>
            <p className='font-vazirmatn animate-in fade-in slide-in-from-bottom-4 text-foreground/90 mb-8 max-w-xl text-lg leading-relaxed delay-200 duration-1000 md:text-xl'>
              <span className='text-accent'>
                شبکه‌ای از خلاقیت و فناوری برای ساخت آینده دیجیتال
              </span>
            </p>
            <div className='animate-in fade-in slide-in-from-bottom-4 font-vazirmatn z-10 flex flex-col gap-4 delay-300 duration-1000 sm:flex-row sm:items-center'>
              <MagneticButton
                size='lg'
                variant='primary'
                onClick={() => scrollToSection(6)}
              >
                مشاوره رایگان
              </MagneticButton>
              <MagneticButton
                size='lg'
                variant='secondary'
                onClick={() => scrollToSection(3)}
              >
                سرویس‌ها را ببینید
              </MagneticButton>
            </div>
          </div>

          <div className='animate-in fade-in absolute bottom-2 left-1/2 mb-3 -translate-x-1/2 delay-500 duration-1000'>
            <div className='flex items-center gap-2'>
              <p className='font-space text-foreground/80 text-xs'>
                Scroll to explore
              </p>
              <div className='border-foreground/20 bg-foreground/15 flex h-6 w-12 items-center justify-center rounded-full border backdrop-blur-md'>
                <div className='bg-foreground/80 h-2 w-2 animate-pulse rounded-full' />
              </div>
            </div>
          </div>
        </section>
        <ServicesSection />
        <BlogSection posts={[]} />
        <AboutSection scrollToSection={scrollToSection} />
        <ContactSection />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
