import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', sans-serif; background-color: #f4f4f5; color: #18181b; padding: 40px 0; }
            .container { max-w-2xl; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .header { border-bottom: 2px solid #e4e4e7; padding-bottom: 24px; margin-bottom: 24px; }
            h1 { font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #18181b; margin: 0; }
            .meta-data { margin-bottom: 32px; }
            .meta-item { margin-bottom: 12px; font-size: 14px; }
            .label { font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-size: 12px; }
            .value { font-weight: 500; font-size: 16px; margin-top: 4px; }
            .message-box { background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 8px; padding: 24px; font-size: 16px; line-height: 1.6; white-space: pre-wrap; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #a1a1aa; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Portfolio Inquiry</h1>
            </div>
            
            <div class="meta-data">
              <div class="meta-item">
                <div class="label">From Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="meta-item">
                <div class="label">Email Address</div>
                <div class="value">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </div>
              </div>
              <div class="meta-item">
                <div class="label">Subject</div>
                <div class="value">${subject || 'General Inquiry'}</div>
              </div>
            </div>

            <div class="label" style="margin-bottom: 8px;">Message Details</div>
            <div class="message-box">${message}</div>

            <div class="footer">
              Sent securely from saidheeraj.co.in Contact Form
            </div>
          </div>
        </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: '16saidheeraj@gmail.com',
      replyTo: email,
      subject: `New Portfolio Message: ${subject || 'General Inquiry'}`,
      html: htmlTemplate,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
