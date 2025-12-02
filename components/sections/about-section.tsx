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
              <h2 className='font-larasoft text-foreground mb-3 text-4xl leading-[1.1] font-light tracking-tight md:mb-4 md:text-6xl lg:text-7xl'>
                همراه شما
                <br />
                در مسیر
                <br />
                تحول دیجیتال
              </h2>
            </div>

            <div
              className={`font-vazirmatn space-y-6 text-sm leading-loose md:text-base ${
                isVisible ? 'opacity-100' : 'opacity-0'
              } transition-opacity delay-300 duration-1000`}
            >
              <p className='text-foreground/80'>
                در لارا سافت، ما فراتر از یک تیم فنی هستیم؛ ما شریک رشد کسب‌وکار
                شما هستیم. تمرکز ما بر ارائه راهکارهای جامع فناوری اطلاعات، از
                زیرساخت‌های شبکه پایدار تا نرم‌افزارهای پیشرفته است.
              </p>
              <p className='text-foreground/60'>
                ما باور داریم که تکنولوژی نباید پیچیده باشد. هدف ما ساده‌سازی
                فرآیندها و ایجاد بستری امن است تا شما با خیال آسوده بر رشد تجارت
                خود تمرکز کنید. با تکیه بر دانش روز و تجربه تیم متخصص ما، آینده
                کسب‌وکارتان را تضمین کنید.
              </p>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className='grid grid-cols-2 gap-8 md:gap-12'>
            {[
              {
                value: '+۵۰',
                label: 'پروژه موفق',
                sublabel: 'در حوزه‌های مختلف',
              },
              {
                value: '+۵',
                label: 'سال تجربه',
                sublabel: 'تخصص و تعهد',
              },
              {
                value: '%۱۰۰',
                label: 'رضایت مشتریان',
                sublabel: 'اولویت اصلی ما',
              },
              {
                value: '۲۴/۷',
                label: 'پشتیبانی',
                sublabel: 'همواره در کنار شما',
              },
            ].map((stat, i) => {
              return (
                <div
                  key={i}
                  className={`border-foreground/10 flex flex-col justify-center border-t pt-4 transition-all duration-700 ${
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${300 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? '0' : 'auto',
                    maxWidth: i % 2 === 0 ? '100%' : '85%',
                  }}
                >
                  <div className='font-vazirmatn text-foreground text-3xl font-light md:text-6xl lg:text-7xl'>
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
            شروع همکاری
          </MagneticButton>
          <MagneticButton
            size='lg'
            variant='secondary'
            onClick={() => scrollToSection?.(1)}
          >
            نمونه‌کارها
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
