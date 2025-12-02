import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Make sure RESEND_API_KEY is in your .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lead, inputs, estimatedPrice } = body;

    // Validate
    if (!lead || !lead.name || !lead.phone) {
      return NextResponse.json(
        { error: 'Name and Phone are required' },
        { status: 400 }
      );
    }

    // Format the inputs for the email body
    const inputList = Object.entries(inputs)
      .filter(([key, value]) => value !== 0 && value !== false) // Only show active inputs
      .map(([key, value]) => {
        return `- ${key}: ${value}`;
      })
      .join('\n');

    const { data, error } = await resend.emails.send({
      from: 'LaraSoft Quote <info@larasoft.co>',
      to: ['info@larasoft.co'], // Send to yourself
      replyTo: lead.email || 'info@larasoft.co',
      subject: `New Quote Request: ${lead.name}`,
      text: `
        NEW LEAD:
        Name: ${lead.name}
        Phone: ${lead.phone}
        Email: ${lead.email}

        ESTIMATED PRICE: ${Number(estimatedPrice).toLocaleString()} Tomans

        DETAILS:
        ${inputList}
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
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
