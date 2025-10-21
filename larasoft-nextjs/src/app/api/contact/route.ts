// src/app/api/contact/route.ts

import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // --- Basic Validation ---
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // --- Configure Nodemailer ---
    // We use environment variables for security (see Step 3)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // --- Define Email Options ---
    const mailOptions = {
      from: `"${name}" <${email}>`, // This will show the sender's name and email
      to: process.env.EMAIL_TO, // The address you want to receive notifications
      subject: `New Contact Form Submission from LaraSoft.co`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
      `,
    };

    // --- Send Email ---
    await transporter.sendMail(mailOptions);

    // --- Send Success Response ---
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}