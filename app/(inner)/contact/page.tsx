import type { Metadata } from 'next';
import { ContactSection } from '@/components/sections/contact-section';

export const metadata: Metadata = {
  title: 'تماس با ما | LaraSoft',
  description: 'راه‌های ارتباطی با لارا سافت برای مشاوره و شروع پروژه',
};

export default function ContactPage() {
  return (
    <div className='min-h-screen'>
      {/* We reuse the ContactSection component because it already contains 
        the form logic, API connection, and layout we want.
        We wrap it in a div to give it proper page spacing.
      */}
      <div className='container mx-auto'>
        <ContactSection />
      </div>
    </div>
  );
}
