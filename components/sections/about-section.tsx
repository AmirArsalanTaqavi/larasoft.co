'use client';

import { MagneticButton } from '@/components/magnetic-button';
import { useReveal } from '@/hooks/use-reveal';

export function AboutSection({
  scrollToSection,
}: {
  scrollToSection?: (index: number) => void;
}) {
  const { ref, isVisible } = useReveal(0.3);

  return (
    <section
      ref={ref}
      id='section-3'
      className='flex h-dvh w-dvw shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16'
    >
      <div className='mx-auto w-full max-w-7xl'>
        <div className='grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24'>
          {/* Left side - Story */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-12 opacity-0'
              }`}
            >
              <h2 className='font-larasoft text-foreground mb-3 text-3xl leading-[1.1] font-light tracking-tight md:mb-4 md:text-6xl lg:text-7xl'>
                آینده
                <br />
                دیجیتال
                <br />
                را با ما بسازید
                <br />
              </h2>
            </div>

            <div
              className={`font-vazirmatn space-y-3 transition-all duration-700 md:space-y-4 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <p className='text-foreground/90 max-w-md text-sm leading-relaxed md:text-lg'>
                در لارسافت، ما به قدرت طراحی و فناوری برای تحول کسب‌وکارها و
                ایجاد تجربیات دیجیتال استثنایی اعتقاد داریم.
              </p>
              <p className='text-foreground/90 max-w-md text-sm leading-relaxed md:text-lg'>
                تیمی از خلاقان، توسعه‌دهندگان و استراتژیست‌های پرشور هستیم که
                متعهد به ارائه راه‌حل‌های نوآورانه هستیم.
              </p>
              <p className='text-foreground/90 max-w-md text-sm leading-relaxed md:text-lg'>
                بیایید با هم همکاری کنیم تا آینده دیجیتال را شکل دهیم و تأثیری
                ماندگار ایجاد کنیم.
              </p>
            </div>
          </div>

          {/* Right side - Stats with creative layout */}
          <div className='flex flex-col justify-center space-y-6 md:space-y-12'>
            {[
              {
                value: '150+',
                label: 'پروژه‌',
                sublabel: 'Project',
                direction: 'right',
              },
              {
                value: '8',
                label: 'سال',
                sublabel: 'Experience',
                direction: 'left',
              },
              {
                value: '12',
                label: 'جوایز',
                sublabel: 'Awards',
                direction: 'right',
              },
            ].map((stat, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return stat.direction === 'left'
                    ? '-translate-x-16 opacity-0'
                    : 'translate-x-16 opacity-0';
                }
                return 'translate-x-0 opacity-100';
              };

              return (
                <div
                  key={i}
                  className={`border-foreground/30 flex items-baseline gap-4 border-l pl-4 transition-all duration-700 md:gap-8 md:pl-8 ${getRevealClass()}`}
                  style={{
                    transitionDelay: `${300 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? '0' : 'auto',
                    maxWidth: i % 2 === 0 ? '100%' : '85%',
                  }}
                >
                  <div className='font-space text-foreground text-3xl font-light md:text-6xl lg:text-7xl'>
                    {stat.value}
                  </div>
                  <div>
                    <div className='font-vazirmatn text-foreground text-base font-light md:text-xl'>
                      {stat.label}
                    </div>
                    <div className='text-foreground/60 text-xs'>
                      {stat.sublabel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-16 md:gap-4 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: '750ms' }}
        >
          <MagneticButton
            size='lg'
            variant='primary'
            onClick={() => scrollToSection?.(4)}
          >
            Start a Project
          </MagneticButton>
          <MagneticButton
            size='lg'
            variant='secondary'
            onClick={() => scrollToSection?.(1)}
          >
            View Our Work
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
