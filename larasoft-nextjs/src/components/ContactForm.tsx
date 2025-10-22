// src/components/ContactForm.tsx
'use client';

import React, { useState } from 'react';
import { sendContactForm } from '@/app/actions/index';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);

    const result = await sendContactForm(formData);

    if (result.success) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
      setErrorMessage(result.message || 'خطایی در ارسال پیام رخ داد.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        max-w-xl mx-auto mt-12 p-8 rounded-2xl shadow-lg
        bg-card text-foreground border border-border
        space-y-6 text-right
      "
      dir="rtl"
    >
      <div className="space-y-2">
        <Label htmlFor="name">نام</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'loading'}
          className="text-right"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'loading'}
          className="text-right"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">متن پیام</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'loading'}
          className="text-right"
        />
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'در حال ارسال...' : 'ارسال پیام'}
        </Button>

        {status === 'success' && (
          <p className="text-sm text-green-500 transition-opacity">پیام با موفقیت ارسال شد!</p>
        )}

        {status === 'error' && (
          <p className="text-sm text-red-500 transition-opacity">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}
