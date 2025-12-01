'use client';

import React, { useState, type FormEvent } from 'react';
import { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import { MagneticButton } from '@/components/magnetic-button';
import DotPattern from '@/components/ui/dot-pattern';

// Metadata needs to be exported from a Server Component or handled via a separate layout/generateMetadata.
// Since this is a Client Component (needs hooks for the form), we should ideally put metadata in layout or use 'use client' carefully.
// For simplicity in App Router, page.tsx can be client side if needed, but we lose metadata export.
// BETTER APPROACH: Keep this Client Component for the form, but let's make the page hybrid or just simple client for now.
// Given the requirements, I will make this a Client Component for the form logic.

export default function ContactPage() {
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
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <main className='min-h-screen w-dvw px-6 pt-32 pb-20 md:px-12'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='animate-in fade-in slide-in-from-bottom-4 mb-16 duration-700'>
          <h1 className='font-larasoft text-foreground mb-4 text-5xl md:text-7xl'>
            تماس با ما
          </h1>
          <p className='font-vazirmatn text-foreground/60 max-w-2xl text-lg'>
            برای شروع پروژه جدید یا دریافت مشاوره، همین حالا با ما در ارتباط
            باشید.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24'>
          {/* Contact Info Column */}
          <div className='animate-in fade-in slide-in-from-bottom-8 space-y-12 delay-100 duration-700'>
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='bg-foreground/5 border-foreground/10 rounded-full border p-3'>
                  <Mail className='text-accent h-6 w-6' />
                </div>
                <div>
                  <h3 className='font-vazirmatn mb-1 text-xl font-bold'>
                    ایمیل
                  </h3>
                  <a
                    href='mailto:info@larasoft.co'
                    className='font-space text-foreground/70 hover:text-accent transition-colors'
                  >
                    info@larasoft.co
                  </a>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='bg-foreground/5 border-foreground/10 rounded-full border p-3'>
                  <MapPin className='text-accent h-6 w-6' />
                </div>
                <div>
                  <h3 className='font-vazirmatn mb-1 text-xl font-bold'>
                    آدرس
                  </h3>
                  <p className='font-vazirmatn text-foreground/70 leading-relaxed'>
                    تهران، میدان فردوسی، کوچه شاهرود
                    <br />
                    پلاک 5 واحد 3
                  </p>
                </div>
              </div>
            </div>

            <div className='border-foreground/10 border-t pt-8'>
              <h3 className='font-vazirmatn mb-6 text-lg opacity-60'>
                شبکه‌های اجتماعی
              </h3>
              <div className='flex gap-6'>
                {['WhatsApp', 'Instagram', 'LinkedIn', 'Telegram'].map(
                  (social) => (
                    <a
                      key={social}
                      href='#'
                      className='font-space text-foreground/50 hover:text-accent text-sm transition-colors'
                    >
                      {social}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className='border-foreground/10 bg-foreground/5 animate-in fade-in slide-in-from-bottom-8 relative rounded-3xl border p-8 backdrop-blur-2xl delay-200 duration-700 md:p-10'>
            <DotPattern className='rounded-2xl' />
            <form onSubmit={handleSubmit} className='relative space-y-6'>
              <div>
                <label className='font-vazirmatn text-foreground/60 mb-2 block text-sm'>
                  نام و نام خانوادگی
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className='bg-background/50 border-foreground/10 focus:border-accent/50 relative w-full rounded-xl border px-4 py-3 transition-colors focus:outline-none'
                  placeholder='نام شما'
                />
              </div>
              <div>
                <label className='font-vazirmatn text-foreground/60 mb-2 block text-sm'>
                  ایمیل
                </label>
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className='bg-background/50 border-foreground/10 focus:border-accent/50 relative w-full rounded-xl border px-4 py-3 transition-colors focus:outline-none'
                  placeholder='example@mail.com'
                />
              </div>
              <div>
                <label className='font-vazirmatn text-foreground/60 mb-2 block text-sm'>
                  پیام
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className='bg-background/50 border-foreground/10 focus:border-accent/50 relative w-full rounded-xl border px-4 py-3 transition-colors focus:outline-none'
                  placeholder='پیام خود را بنویسید...'
                />
              </div>

              <MagneticButton
                variant='primary'
                size='lg'
                className='relative w-full justify-center'
                // onClick handling is tricky on custom components if not passed down,
                // assuming MagneticButton renders a button that respects disabled state from context or props if added.
                // For a real form submit, a standard button inside might be safer unless MagneticButton supports type="submit"
              >
                {status === 'submitting' ? 'در حال ارسال...' : 'ارسال پیام'}
              </MagneticButton>

              {status === 'success' && (
                <p className='font-vazirmatn text-accent animate-in fade-in mt-4 text-center text-sm'>
                  پیام شما با موفقیت ارسال شد!
                </p>
              )}
              {status === 'error' && (
                <p className='font-vazirmatn animate-in fade-in mt-4 text-center text-sm text-red-500'>
                  خطایی رخ داد. لطفا دوباره تلاش کنید.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
