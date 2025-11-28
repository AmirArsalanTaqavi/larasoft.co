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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call later)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section
      id='section-4'
      ref={ref}
      className='flex h-dvh w-dvw shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16'
    >
      <div className='mx-auto w-full max-w-7xl'>
        <div className='grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24'>
          <div className='flex flex-col justify-center'>
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-12 opacity-0'
              }`}
            >
              <h2 className='font-larasoft text-foreground mb-2 text-4xl leading-[1.05] font-light tracking-tight md:mb-3 md:text-7xl lg:text-8xl'>
                با ما
                <br />
                در ارتباط باشید
                <br />
              </h2>
              <p className='font-space text-foreground/60 text-xs md:text-base'>
                Get in touch /
              </p>
            </div>

            <div className='space-y-4 md:space-y-8'>
              <a
                href='mailto:info@larasoft.co'
                className={`group block transition-all duration-700 ${
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className='mb-1 flex items-center gap-2'>
                  <Mail className='text-foreground/60 h-3 w-3' />
                  <span className='font-space text-foreground/60 text-xs'>
                    Email
                  </span>
                </div>
                <p className='text-foreground group-hover:text-accent/70 text-base transition-colors md:text-2xl'>
                  info@larasoft.co
                </p>
              </a>
              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: '350ms' }}
              >
                <a
                  href='https://maps.app.goo.gl/2zQ6qBBXEVbH9Ysu6'
                  className={`group block transition-all duration-700 ${
                    isVisible
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-16 opacity-0'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <div className='mb-1 flex items-center gap-2'>
                    <MapPin className='text-foreground/60 h-3 w-3' />
                    <span className='font-vazirmatn text-foreground/60 text-xs'>
                      آدرس
                    </span>
                  </div>
                  <p className='text-foreground font-vazirmatn group-hover:text-accent/70 text-base transition-colors md:text-2xl'>
                    تهران، ایران
                    <br />
                    میدان فردوسی، کوچه شاهرود
                    <br />
                    پلاک 5 واحد 3
                  </p>
                </a>
              </div>

              <div
                className={`flex gap-5 pt-2 transition-all duration-700 md:pt-4 ${
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: '350ms' }}
              >
                {['WhatsApp', 'Instagram', 'LinkedIn', 'Telegram'].map(
                  (social, i) => (
                    <a
                      key={social}
                      href='#'
                      className='font-space text-accent/60 hover:border-accent/60 hover:text-foreground/90 text-s border-b border-transparent transition-all'
                    >
                      {social}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right side - Minimal form */}
          <div className='flex flex-col justify-center'>
            <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <label className='font-vazirmatn text-foreground/60 mb-1 block text-xs md:mb-2'>
                  نام
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className='border-foreground/30 text-foreground placeholder:text-foreground/40 focus:border-foreground/50 w-full border-b bg-transparent py-1.5 text-sm focus:outline-none md:py-2 md:text-base'
                  placeholder='Your name'
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '350ms' }}
              >
                <label className='font-vazirmatn text-foreground/60 mb-1 block text-xs md:mb-2'>
                  ایمیل
                </label>
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className='border-foreground/30 text-foreground placeholder:text-foreground/40 focus:border-foreground/50 w-full border-b bg-transparent py-1.5 text-sm focus:outline-none md:py-2 md:text-base'
                  placeholder='your@email.com'
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <label className='font-vazirmatn text-foreground/60 mb-1 block text-xs md:mb-2'>
                  پیام شما
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className='border-foreground/30 font-vazirmatn text-foreground placeholder:text-foreground/40 focus:border-foreground/50 w-full border-b bg-transparent py-1.5 text-sm focus:outline-none md:py-2 md:text-base'
                  placeholder='در رابطه با پروژه خود بنویسید...'
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
                  className='font-vazirmatn w-full disabled:opacity-50'
                  onClick={isSubmitting ? undefined : undefined}
                >
                  {isSubmitting ? 'در حال ارسال' : 'ارسلال پیام'}
                </MagneticButton>
                {submitSuccess && (
                  <p className='font-space text-foreground/80 mt-3 text-center text-sm'>
                    پیام شما با موفقیت ارسال شد!
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
