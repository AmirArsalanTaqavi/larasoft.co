'use client'; // This must be a Client Component to handle state and interactivity

import React, { useState } from 'react';
// We will define this server-side action later
import { sendContactForm } from '@/app/actions/index'; 

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);

    // Call the Server Action
    const result = await sendContactForm(formData);

    if (result.success) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } else {
      setStatus('error');
      setErrorMessage(result.message || 'خطایی در ارسال پیام رخ داد.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">نام</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          disabled={status === 'loading'}
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">ایمیل</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          disabled={status === 'loading'}
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">متن پیام</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          disabled={status === 'loading'}
        />
      </div>

      {/* Submission Button and Status */}
      <div className="flex items-center justify-end space-x-4">
        <button
          type="submit"
          className={`px-4 py-2 text-white font-bold rounded-md transition-colors ${
            status === 'loading' ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'در حال ارسال...' : 'ارسال پیام'}
        </button>
        
        {status === 'success' && <p className="text-green-600">پیام با موفقیت ارسال شد!</p>}
        {status === 'error' && <p className="text-red-600">{errorMessage}</p>}
      </div>
    </form>
  );
}