'use client';

import { Dot, Mail, MapPin } from 'lucide-react';
import { useReveal } from '@/hooks/use-reveal';
import { useState, type FormEvent } from 'react';
import { MagneticButton } from '@/components/magnetic-button';
import DotPattern from '../ui/dot-pattern';

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
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-24'>
          {/* Contact Info */}
          <div>
            <div
              className={`mb-8 transition-all duration-700 ${
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
              <p className='font-vazirmatn text-foreground/60 max-w-md text-justify text-base leading-relaxed'>
                آماده شنیدن چالش‌ها و ایده‌های شما هستیم. برای مشاوره رایگان یا
                شروع یک پروژه جدید، فرم روبرو را پر کنید یا از طریق راه‌های
                ارتباطی با ما تماس بگیرید.
              </p>
            </div>

            <div className='space-y-4'>
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
                  <div className='font-vazirmatn text-xs opacity-50'>ایمیل</div>
                  <div className='font-space text-md'>info@larasoft.co</div>
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
                  <div className='font-vazirmatn text-xs opacity-50'>آدرس</div>
                  <div className='font-vazirmatn text-md'>
                    تهران، میدان فردوسی، کوچه شاهرود
                    <br />
                    پلاک 5 واحد 3
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`bg-foreground/5 relative h-fit rounded-2xl px-4 py-2 transition-all duration-1000 backdrop:backdrop-blur-2xl md:p-8 ${
              isVisible ? 'opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <DotPattern className='rounded-2xl' />
            <form onSubmit={handleSubmit} className='relative z-10 space-y-2'>
              <div className='space-y-2'>
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
                  style={{ textAlign: 'right' }}
                  className='font-space border-foreground/10 placeholder:text-foreground/30 focus:border-foreground/50 w-full border-b bg-transparent py-3 text-left text-sm focus:outline-none md:text-base'
                  placeholder='Email Address'
                />
                <textarea
                  rows={3}
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
                  className='font-vazirmatn w-full disabled:cursor-not-allowed disabled:opacity-50'
                  onClick={status === 'submitting' ? undefined : undefined}
                >
                  {status === 'submitting' ? 'در حال ارسال...' : 'ارسال پیام'}
                </MagneticButton>

                {status === 'success' && (
                  <p className='font-vazirmatn text-accent animate-in fade-in mt-3 text-center text-sm'>
                    پیام شما با موفقیت دریافت شد. به زودی با شما تماس می‌گیریم.
                  </p>
                )}
                {status === 'error' && (
                  <p className='font-vazirmatn animate-in fade-in mt-3 text-center text-sm text-red-500'>
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
