'use client';

import { Mail, MapPin } from 'lucide-react';
import { useReveal } from '@/hooks/use-reveal';
import { useState, type FormEvent } from 'react';
import { MagneticButton } from '@/components/magnetic-button';

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id='section-4'
      ref={ref}
      className='flex h-dvh w-dvw shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16'
    >
      <div className='mx-auto w-full max-w-7xl'>
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-24'>
          {/* Contact Info */}
          <div>
            <div
              className={`mb-12 transition-all duration-700 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-12 opacity-0'
              }`}
            >
              <h2 className='font-larasoft text-foreground mb-6 text-4xl font-light tracking-tight md:text-6xl lg:text-7xl'>
                با ما در
                <br />
                تماس باشید
              </h2>
              <p className='font-vazirmatn text-foreground/60 max-w-md text-base leading-relaxed'>
                آماده شنیدن چالش‌ها و ایده‌های شما هستیم. برای مشاوره رایگان یا
                شروع یک پروژه جدید، فرم روبرو را پر کنید یا از طریق راه‌های
                ارتباطی با ما تماس بگیرید.
              </p>
            </div>

            <div className='space-y-8'>
              <a
                href='mailto:info@larasoft.co'
                className={`group flex items-center gap-4 transition-all duration-700 ${
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-12 opacity-0'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className='border-foreground/10 group-hover:border-accent group-hover:bg-accent/10 flex h-12 w-12 items-center justify-center rounded-full border transition-colors'>
                  <Mail className='h-5 w-5' />
                </div>
                <div>
                  <div className='font-vazirmatn text-xs opacity-50'>
                    ایمیل
                  </div>
                  <div className='font-space text-lg'>info@larasoft.co</div>
                </div>
              </a>

              <div
                className={`flex items-center gap-4 transition-all duration-700 ${
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-12 opacity-0'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className='border-foreground/10 flex h-12 w-12 items-center justify-center rounded-full border'>
                  <MapPin className='h-5 w-5' />
                </div>
                <div>
                  <div className='font-vazirmatn text-xs opacity-50'>
                    آدرس
                  </div>
                  <div className='font-vazirmatn text-lg'>
                    تهران، میدان فردوسی
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`bg-foreground/5 rounded-2xl p-6 transition-all duration-1000 md:p-8 ${
              isVisible ? 'opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-4'>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='font-vazirmatn border-foreground/10 placeholder:text-foreground/30 focus:border-foreground/50 w-full border-b bg-transparent py-3 text-sm focus:outline-none md:text-base'
                  placeholder='نام و نام خانوادگی'
                />
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='font-space border-foreground/10 placeholder:text-foreground/30 focus:border-foreground/50 w-full border-b bg-transparent py-3 text-left text-sm focus:outline-none md:text-base'
                  placeholder='Email Address'
                  dir='ltr'
                />
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className='font-vazirmatn border-foreground/10 placeholder:text-foreground/30 focus:border-foreground/50 w-full border-b bg-transparent py-3 text-sm focus:outline-none md:text-base'
                  placeholder='درباره پروژه یا درخواست خود برایمان بنویسید...'
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: '650ms' }}
              >
                <MagneticButton
                  variant='primary'
                  size='lg'
                  className='font-vazirmatn w-full disabled:cursor-not-allowed disabled:opacity-50'
                  onClick={status === 'submitting' ? undefined : undefined}
                >
                  {status === 'submitting' ? 'در حال ارسال...' : 'ارسال پیام'}
                </MagneticButton>

                {status === 'success' && (
                  <p className='font-space text-accent animate-in fade-in mt-3 text-center text-sm'>
                    پیام شما با موفقیت دریافت شد. به زودی با شما تماس می‌گیریم.
                  </p>
                )}
                {status === 'error' && (
                  <p className='font-space animate-in fade-in mt-3 text-center text-sm text-red-500'>
                    خطایی رخ داد. لطفا دوباره تلاش کنید.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}