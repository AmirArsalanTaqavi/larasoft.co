import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'حریم خصوصی | LaraSoft',
  description: 'سیاست حفظ حریم خصوصی کاربران در لارا سافت',
};

export default function PrivacyPage() {
  return (
    <div className='font-vazirmatn container mx-auto max-w-4xl px-4 py-24 md:py-32'>
      <div className='mb-12 border-b border-foreground/10 pb-8'>
        <h1 className='font-larasoft mb-4 text-3xl font-bold md:text-5xl'>
          سیاست حفظ حریم خصوصی
        </h1>
        <p className='font-space text-foreground/60 text-lg'>/ Privacy Policy</p>
        <p className='mt-4 text-sm text-foreground/40'>
          آخرین بروزرسانی: ۱۰ آذر ۱۴۰۴
        </p>
      </div>

      <div className='prose prose-invert max-w-none text-foreground/80'>
        <section className='mb-10'>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۱. کلیات
          </h2>
          <p className='leading-loose'>
            لارا سافت («ما») به حریم خصوصی کاربران خود احترام می‌گذارد و متعهد
            به حفاظت از اطلاعات شخصی شماست. این سیاست‌نامه توضیح می‌دهد که چگونه
            اطلاعات شما را جمع‌آوری، استفاده و محافظت می‌کنیم. استفاده از خدمات
            ما به منزله پذیرش این سیاست‌هاست.
          </p>
        </section>

        <section className='mb-10'>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۲. اطلاعاتی که جمع‌آوری می‌کنیم
          </h2>
          <ul className='list-disc space-y-2 pr-6 leading-loose marker:text-accent'>
            <li>
              <strong>اطلاعات تماس:</strong> نام، آدرس ایمیل، و شماره تماس که در
              فرم‌های «تماس با ما» یا درخواست پروژه وارد می‌کنید.
            </li>
            <li>
              <strong>اطلاعات فنی:</strong> آدرس IP، نوع مرورگر، و اطلاعات
              دستگاه برای بهبود تجربه کاربری و امنیت سایت.
            </li>
            <li>
              <strong>کوکی‌ها:</strong> ما از کوکی‌های ضروری برای عملکرد صحیح وب‌سایت و آنالیز ترافیک استفاده می‌کنیم.
            </li>
          </ul>
        </section>

        <section className='mb-10'>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۳. نحوه استفاده از اطلاعات
          </h2>
          <p className='leading-loose'>
            ما از اطلاعات جمع‌آوری شده صرفاً برای اهداف زیر استفاده می‌کنیم:
          </p>
          <ul className='list-disc space-y-2 pr-6 leading-loose marker:text-accent'>
            <li>پاسخگویی به درخواست‌ها و سوالات شما.</li>
            <li>ارائه خدمات پشتیبانی و فنی.</li>
            <li>ارسال اطلاعیه‌های مهم مربوط به سرویس‌ها (در صورت عضویت).</li>
            <li>بهبود عملکرد و امنیت وب‌سایت.</li>
          </ul>
        </section>

        <section className='mb-10'>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۴. امنیت اطلاعات
          </h2>
          <p className='leading-loose'>
            ما از پروتکل‌های امنیتی استاندارد (مانند SSL) و اقدامات فنی مناسب
            برای محافظت از اطلاعات شما در برابر دسترسی غیرمجاز، تغییر یا افشا
            استفاده می‌کنیم. با این حال، هیچ روش انتقال داده‌ای در اینترنت ۱۰۰٪
            امن نیست.
          </p>
        </section>

        <section className='mb-10'>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۵. اشتراک‌گذاری اطلاعات
          </h2>
          <p className='leading-loose'>
            ما اطلاعات شخصی شما را به هیچ شخص ثالثی نمی‌فروشیم و اجاره
            نمی‌دهیم. اشتراک‌گذاری اطلاعات تنها در موارد زیر انجام می‌شود:
          </p>
          <ul className='list-disc space-y-2 pr-6 leading-loose marker:text-accent'>
            <li>الزام قانونی یا دستور قضایی.</li>
            <li>برای محافظت از حقوق و امنیت لارا سافت و کاربران آن.</li>
          </ul>
        </section>

        <section>
          <h2 className='font-larasoft mb-4 text-2xl text-foreground'>
            ۶. تماس با ما
          </h2>
          <p className='leading-loose'>
            اگر سوالی در مورد این سیاست‌نامه دارید، لطفاً با ما تماس بگیرید:
            <br />
            <span className='font-space text-accent block mt-2 ltr text-left'>
              info@larasoft.co
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}