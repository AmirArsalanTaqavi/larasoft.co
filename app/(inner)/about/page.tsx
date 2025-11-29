import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { MagneticButton } from '@/components/magnetic-button';

export const metadata: Metadata = {
  title: 'درباره ما | LaraSoft',
  description: 'داستان ما، تیمی از متخصصان فناوری و خلاقیت در تهران',
};

export default function AboutPage() {
  return (
    <main className='min-h-screen w-full px-6 pt-32 pb-20 md:px-12'>
      <div className='mx-auto max-w-7xl'>
        {/* Hero Section */}
        <section className='animate-in fade-in slide-in-from-bottom-8 mb-24 duration-1000'>
          <h1 className='font-larasoft text-foreground mb-8 text-6xl leading-[0.9] md:text-8xl'>
            تلفیق <span className='text-accent'>هنر</span> و{' '}
            <span className='text-accent'>تکنولوژی</span>
          </h1>
          <p className='font-vazirmatn text-foreground/70 max-w-3xl text-lg leading-relaxed md:text-2xl'>
            ما در لاراسافت معتقدیم که آینده دیجیتال، جایی است که کدنویسی دقیق با
            خلاقیت هنری گره می‌خورد. از زیرساخت‌های شبکه تا ریزترین جزئیات
            طراحی.
          </p>
        </section>

        {/* The Vision Grid */}
        <section className='mb-32 grid grid-cols-1 gap-12 md:grid-cols-2'>
          <div className='animate-in fade-in slide-in-from-bottom-8 space-y-8 delay-200 duration-1000'>
            <div className='border-foreground/10 bg-foreground/5 hover:border-accent/30 rounded-3xl border p-8 transition-colors md:p-12'>
              <h3 className='font-larasoft text-accent mb-4 text-3xl'>
                Lara Security
              </h3>
              <p className='font-vazirmatn text-foreground/80 leading-loose'>
                امنیت سایبری یک انتخاب نیست، یک ضرورت است. ما با جدیدترین متدهای
                تست نفوذ و ایمن‌سازی، از دارایی‌های دیجیتال شما محافظت می‌کنیم.
              </p>
            </div>
            <div className='border-foreground/10 bg-foreground/5 hover:border-accent/30 rounded-3xl border p-8 transition-colors md:p-12'>
              <h3 className='font-larasoft text-accent mb-4 text-3xl'>
                Lara Center
              </h3>
              <p className='font-vazirmatn text-foreground/80 leading-loose'>
                چشم‌انداز ما ایجاد مراکزی در سراسر کشور برای ارائه خدمات حضوری،
                آموزش و پشتیبانی فنی در دسترس برای همه است.
              </p>
            </div>
          </div>

          <div className='border-foreground/10 animate-in fade-in slide-in-from-bottom-8 relative h-full min-h-[400px] overflow-hidden rounded-3xl border delay-300 duration-1000'>
            {/* Abstract tech/art background */}
            <div className='from-accent/20 absolute inset-0 bg-gradient-to-br to-transparent opacity-50' />
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='p-8 text-center'>
                <h2 className='font-space text-foreground/10 text-5xl font-bold tracking-tighter uppercase md:text-6xl'>
                  Since 2025
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* The Team */}
        <section className='mb-24'>
          <h2 className='font-larasoft mb-12 text-4xl md:text-5xl'>تیم ما</h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {/* Founder */}
            <div className='group border-foreground/10 bg-background relative overflow-hidden rounded-2xl border'>
              <div className='bg-foreground/5 relative aspect-[4/3]'>
                {/* You can replace with real photo later */}
                <div className='from-background absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80' />
              </div>
              <div className='absolute right-0 bottom-0 left-0 p-8'>
                <h3 className='font-vazirmatn mb-1 text-2xl font-bold'>
                  امیرارسلان تقوی
                </h3>
                <p className='font-space text-accent mb-4 text-sm'>
                  Founder & IT Lead
                </p>
                <p className='font-vazirmatn text-foreground/60 max-w-sm text-sm leading-relaxed'>
                  متخصص زیرساخت شبکه و توسعه‌دهنده نرم‌افزار. با اشتیاق به فرمول
                  یک و دنیای تکنولوژی، لاراسافت را برای حل چالش‌های مدرن بنا
                  کردم.
                </p>
              </div>
            </div>

            {/* Creative Director */}
            <div className='group border-foreground/10 bg-background relative overflow-hidden rounded-2xl border'>
              <div className='bg-foreground/5 relative aspect-[4/3]'>
                {/* You can replace with real photo later */}
                <div className='from-background absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80' />
              </div>
              <div className='absolute right-0 bottom-0 left-0 p-8'>
                <h3 className='font-vazirmatn mb-1 text-2xl font-bold'>سارا</h3>
                <p className='font-space text-accent mb-4 text-sm'>
                  Creative Director & Artist
                </p>
                <p className='font-vazirmatn text-foreground/60 max-w-sm text-sm leading-relaxed'>
                  هنرمند و خالق جزئیات. مدیریت بخش هنری و تبلیغات لاراسافت و
                  گالری مینیاتور Jute.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className='border-foreground/10 border-t py-24 text-center'>
          <h2 className='font-vazirmatn mb-8 text-3xl md:text-4xl'>
            آماده همکاری با ما هستید؟
          </h2>
          <MagneticButton variant='primary' size='lg' href='/contact'>
            تماس با ما
          </MagneticButton>
        </div>
      </div>
    </main>
  );
}
