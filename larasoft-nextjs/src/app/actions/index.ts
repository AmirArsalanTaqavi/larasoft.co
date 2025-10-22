// src/app/actions/index.ts

'use server'; 

import { Resend } from 'resend';

// 1. Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// --- HELPER INTERFACES (from your file) ---
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface LeadData {
  name: string;
  phone: string;
  email: string;
  quoteSummary: string;
  quoteInputs: string;
}

// 2. The sendContactForm action (Corrected)
export async function sendContactForm(data: FormData) {
  if (!data.name || !data.email || !data.message) {
    return { success: false, message: 'لطفاً تمام فیلدها را پر کنید.' };
  }

  const fromEmail = process.env.SMTP_USER;
  const toEmail = data.email;

  if (!fromEmail || !toEmail) {
    console.error('Missing SMTP_USER or CONTACT_EMAIL_RECEIVER from .env');
    return { success: false, message: 'خطای پیکربندی سرور ایمیل.' };
  }

  try {
    await resend.emails.send({
      from: `${fromEmail}`,
      to: [toEmail],
      replyTo: data.email,
      subject: `پیام جدید از وبسایت لارا سافت: ${data.name}`,
      html: `
        <h2>پیام جدید</h2>
        <p><strong>نام:</strong> ${data.name}</p>
        <p><strong>ایمیل:</strong> ${data.email}</p>
        <p><strong>متن پیام:</strong></p>
        <p>${data.message}</p>
      `,
    });
    
    return { success: true, message: 'پیام شما با موفقیت ارسال شد.' };

  } catch (error) {
    console.error('Resend Send Error:', error);
    return { success: false, message: 'خطا در اتصال به سرویس ایمیل. لطفاً بعداً دوباره تلاش کنید.' };
  }
}


// 3. The sendQuoteRequest action (Corrected)
export async function sendQuoteRequest(data: LeadData) {
  if (!data.name || !data.phone || !data.quoteSummary) {
    return { success: false, message: 'لطفاً نام، شماره تماس و ایمیل خود را وارد کنید.' };
  }

  const fromEmail = process.env.SMTP_USER;
  const toEmail = process.env.CONTACT_EMAIL_RECEIVER;

  if (!fromEmail || !toEmail) {
    console.error('Missing SMTP_USER or CONTACT_EMAIL_RECEIVER from .env');
    return { success: false, message: 'خطای پیکربندی سرور ایمیل.' };
  }

  try {
    await resend.emails.send({
      from: `LaraSoft Quote <${fromEmail}>`,
      to: [toEmail],
      replyTo: data.email, // 🚨 THIS IS THE FIX: 'reply_to' becomes 'replyTo'
      subject: `💥 درخواست پیش فاکتور جدید از ${data.name} | قیمت: ${data.quoteSummary} تومان`,
      html: `
        <h2>درخواست پیش فاکتور از ماشین حساب</h2>
        <p><strong>نام:</strong> ${data.name}</p>
        <p><strong>شماره تماس:</strong> ${data.phone}</p>
        <p><strong>ایمیل:</strong> ${data.email || 'وارد نشده است'}</p>
        <hr>
        <h3>جزئیات تخمین هزینه (پس از ۲۰٪ تخفیف سال اول):</h3>
        <p><strong>قیمت نهایی ماهانه:</strong> ${data.quoteSummary} تومان</p>
        <p><strong>تجهیزات وارد شده:</strong></p>
        <pre style="background: #eee; padding: 10px; border-radius: 5px; direction: rtl; text-align: right;">${data.quoteInputs}</pre>
      `,
    });

    return { success: true, message: 'درخواست شما ثبت شد. به زودی با شما تماس خواهیم گرفت.' };

  } catch (error) {
    console.error('Resend Quote Send Error:', error);
    return { success: false, message: 'خطا در ارسال درخواست. لطفاً بعداً دوباره تلاش کنید.' };
  }
}