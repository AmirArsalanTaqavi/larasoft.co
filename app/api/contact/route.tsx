import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send the email
    const { data, error } = await resend.emails.send({
      // 1. FROM: Must be your verified domain
      from: 'LaraSoft Contact <info@larasoft.co>',

      // 2. TO: This must be YOUR email, so you receive the notification
      to: ['info@larasoft.co'],

      // 3. REPLY-TO: This is the user's email.
      // When you click "Reply" in your inbox, it goes to them.
      replyTo: email,

      subject: `New Project Inquiry from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
