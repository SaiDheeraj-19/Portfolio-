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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address provided' },
        { status: 400 }
      );
    }

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A0A0A; color: #FAFAFA; padding: 40px 20px; margin: 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0A;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #141414; border: 1px solid #333333; border-radius: 12px; padding: 40px; margin: 0 auto; text-align: left;">
                  <tr>
                    <td style="border-bottom: 1px solid #333333; padding-bottom: 24px; margin-bottom: 24px; display: block;">
                      <h1 style="font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: #FAFAFA; margin: 0;">Direct Message</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 32px;">
                      <div style="margin-bottom: 24px;">
                        <div style="font-weight: 600; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px;">Sender Name</div>
                        <div style="font-weight: 400; font-size: 16px; margin-top: 8px; color: #FAFAFA;">${name}</div>
                      </div>
                      <div style="margin-bottom: 24px;">
                        <div style="font-weight: 600; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px;">Email Address</div>
                        <div style="font-weight: 400; font-size: 16px; margin-top: 8px;">
                          <a href="mailto:${email}" style="color: #FAFAFA; text-decoration: underline; text-underline-offset: 4px;">${email}</a>
                        </div>
                      </div>
                      <div style="margin-bottom: 40px;">
                        <div style="font-weight: 600; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px;">Subject</div>
                        <div style="font-weight: 400; font-size: 16px; margin-top: 8px; color: #FAFAFA;">${subject || 'General Inquiry'}</div>
                      </div>
                      
                      <div style="font-weight: 600; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px; margin-bottom: 12px;">Project Details / Message</div>
                      <div style="background-color: #0A0A0A; border: 1px solid #333333; border-radius: 8px; padding: 24px; font-size: 15px; line-height: 1.8; white-space: pre-wrap; color: #FAFAFA;">${message}</div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-top: 48px;">
                      <div style="font-size: 11px; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em;">
                        Sent securely from <a href="https://saidheeraj.co.in" style="color: #FAFAFA; text-decoration: none;">saidheeraj.co.in</a>
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
