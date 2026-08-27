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
          <meta charset="utf-8">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; color: #18181b; padding: 40px 20px; margin: 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin: 0 auto; text-align: left;">
                  <tr>
                    <td style="border-bottom: 2px solid #e4e4e7; padding-bottom: 24px; margin-bottom: 24px; display: block;">
                      <h1 style="font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #18181b; margin: 0;">New Portfolio Inquiry</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 24px;">
                      <div style="margin-bottom: 16px;">
                        <div style="font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-size: 12px;">From Name</div>
                        <div style="font-weight: 500; font-size: 16px; margin-top: 4px; color: #18181b;">${name}</div>
                      </div>
                      <div style="margin-bottom: 16px;">
                        <div style="font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-size: 12px;">Email Address</div>
                        <div style="font-weight: 500; font-size: 16px; margin-top: 4px;">
                          <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                        </div>
                      </div>
                      <div style="margin-bottom: 32px;">
                        <div style="font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-size: 12px;">Subject</div>
                        <div style="font-weight: 500; font-size: 16px; margin-top: 4px; color: #18181b;">${subject || 'General Inquiry'}</div>
                      </div>
                      
                      <div style="font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-size: 12px; margin-bottom: 8px;">Message Details</div>
                      <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 8px; padding: 24px; font-size: 16px; line-height: 1.6; white-space: pre-wrap; color: #3f3f46;">${message}</div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-top: 40px;">
                      <div style="font-size: 12px; color: #a1a1aa;">
                        Sent securely from <a href="https://saidheeraj.co.in" style="color: #a1a1aa; text-decoration: underline;">saidheeraj.co.in</a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
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
