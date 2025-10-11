'use server'; // This ensures the function only runs on the server side

import nodemailer from 'nodemailer';

// Define the expected input structure
interface FormData {
  name: string;
  email: string;
  message: string;
}

// 1. Configure the transport for the LaraSoft Domain
const transporter = nodemailer.createTransport({
  host: 'mail.larasoft.co',
  port: 465, // Standard secure port for many hosts (can also be 587 or 25)
  secure: true, // IMPORTANT: Use secure connection for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Adding this ignores self-signed certificate issues if they occur
  tls: {
    rejectUnauthorized: false,
  },
});

// 2. The core Server Action executed by the Contact Form
export async function sendContactForm(data: FormData) {
  if (!data.name || !data.email || !data.message) {
    return { success: false, message: 'لطفاً تمام فیلدها را پر کنید.' };
  }
  
  // 3. Construct the email message
  const mailOptions = {
    // IMPORTANT: Sender must be a real email on your domain
    from: process.env.SMTP_USER, 
    to: process.env.CONTACT_EMAIL_RECEIVER, // The email that receives the form submission
    replyTo: data.email, // Allows you to reply directly to the sender
    subject: `پیام جدید از وبسایت لارا سافت: ${data.name}`,
    html: `
      <h2>پیام جدید</h2>
      <p><strong>نام:</strong> ${data.name}</p>
      <p><strong>ایمیل:</strong> ${data.email}</p>
      <p><strong>متن پیام:</strong></p>
      <p>${data.message}</p>
    `,
  };

  try {
    // 4. Send the email
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'پیام شما با موفقیت ارسال شد.' };
  } catch (error) {
    console.error('Email Send Error (Check Credentials):', error);
    return { success: false, message: 'خطا در اتصال به سرویس ایمیل. لطفاً بعداً دوباره تلاش کنید.' };
  }
}

// Lead data type for quote requests (moved out of sendContactForm)
interface LeadData {
  name: string;
  phone: string;
  email: string;
  quoteSummary: string; // Total Price (Formatted Toman)
  quoteInputs: string;  // Detailed list of client assets (Formatted string)
}

// --- New Server Action for Quote Request ---
export async function sendQuoteRequest(data: LeadData) {
  if (!data.name || !data.phone || !data.quoteSummary) {
    return { success: false, message: 'لطفاً نام، شماره تماس و ایمیل خود را وارد کنید.' };
  }

  // Use the same transporter defined earlier in this file.
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL_RECEIVER,
    replyTo: data.email,
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
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'درخواست شما ثبت شد. به زودی با شما تماس خواهیم گرفت.' };
  } catch (error) {
    console.error('Quote Send Error:', error);
    return { success: false, message: 'خطا در ارسال درخواست. لطفاً بعداً دوباره تلاش کنید.' };
  }
}