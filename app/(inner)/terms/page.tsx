import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'قوانین و مقررات | LaraSoft',
  description: 'شرایط و قوانین استفاده از خدمات لارا سافت',
};

export default function TermsPage() {
  return (
    <div className='font-vazirmatn container mx-auto max-w-4xl px-4 py-24 md:py-32'>
      <div className='mb-12 border-b border-foreground/10 pb-8'>
        <h1 className='font-larasoft mb-4 text-3xl font-bold md:text-5xl'>
          شرایط و قوانین استفاده
        </h1>
        <p className='font-space text-foreground/60 text-lg'>
          / Terms of Service
        </p>
        <p className='mt-4 text-sm text-foreground/40'>
          آخرین بروزرسانی: ۱۰ آذر ۱۴۰۴
        </p>
      </div>

      <div className='prose prose-invert max-w-none text-foreground/80'>
        <section className='mb-10'>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۱. پذیرش شرایط
          </h2>
          <p className='leading-loose'>
            با دسترسی و استفاده از وب‌سایت و خدمات لارا سافت، شما موافقت خود را
            با این شرایط و قوانین اعلام می‌دارید. اگر با هر یک از این موارد
            موافق نیستید، لطفاً از خدمات ما استفاده نکنید.
          </p>
        </section>

        <section className='mb-10'>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۲. خدمات ما
          </h2>
          <p className='leading-loose'>
            لارا سافت خدمات تخصصی در زمینه‌های زیر ارائه می‌دهد:
          </p>
          <ul className='list-disc space-y-2 pr-6 leading-loose marker:text-accent'>
            <li>پشتیبانی شبکه و زیرساخت (اکتیو و پسیو).</li>
            <li>توسعه نرم‌افزار، وب‌سایت و اپلیکیشن.</li>
            <li>مشاوره امنیت سایبری.</li>
            <li>خدمات سرور و دیتاسنتر.</li>
          </ul>
          <p className='mt-2 leading-loose'>
            ما حق تغییر، تعلیق یا توقف هر بخش از خدمات را در هر زمان برای خود
            محفوظ می‌داریم.
          </p>
        </section>

        <section className='mb-10'>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۳. تعهدات کاربر
          </h2>
          <p className='leading-loose'>
            شما متعهد می‌شوید که:
          </p>
          <ul className='list-disc space-y-2 pr-6 leading-loose marker:text-accent'>
            <li>اطلاعات صحیح و دقیق در فرم‌های تماس وارد کنید.</li>
            <li>از خدمات ما برای مقاصد غیرقانونی یا مخرب استفاده نکنید.</li>
            <li>به حقوق مالکیت فکری لارا سافت احترام بگذارید.</li>
          </ul>
        </section>

        <section className='mb-10'>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۴. مالکیت فکری
          </h2>
          <p className='leading-loose'>
            تمامی محتوا، طراحی‌ها، لوگوها (شامل برندهای زیرمجموعه مانند لارا
            سکیوریتی و لارا سنتر)، کدها و گرافیک‌های موجود در این وب‌سایت متعلق
            به لارا سافت است و هرگونه کپی‌برداری بدون اجازه کتبی ممنوع است.
          </p>
        </section>

        <section className='mb-10'>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۵. سلب مسئولیت
          </h2>
          <p className='leading-loose'>
            خدمات لارا سافت «همان‌گونه که هست» ارائه می‌شود. ما تمام تلاش خود را
            برای پایداری و امنیت سرویس‌ها انجام می‌دهیم، اما مسئولیت خسارات
            احتمالی ناشی از قطعی اینترنت، حملات سایبری خارج از کنترل ما، یا
            استفاده نادرست کاربر را بر عهده نمی‌گیریم.
          </p>
        </section>

        <section>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۶. تغییرات در قوانین
          </h2>
          <p className='leading-loose'>
            لارا سافت ممکن است این شرایط را در هر زمان بروزرسانی کند. نسخه جدید
            در همین صفحه منتشر خواهد شد و استفاده مداوم شما به معنی پذیرش تغییرات
            است.
          </p>
        </section>
      </div>
    </div>
  );
}