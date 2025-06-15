import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export const POST = async (req: NextRequest,) => {
    const payload = await req.json()

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: payload.email,
            subject: `New message: ${payload.subject}`,
            html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>New Message from Your Portfolio</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 650px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f8f9fa;
      }
      .email-container {
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        overflow: hidden;
        margin: 20px 0;
      }
      .email-header {
        background: linear-gradient(135deg, #4361ee, #3a0ca3);
        color: white;
        padding: 30px 20px;
        text-align: center;
      }
      .email-header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
      }
      .email-body {
        padding: 30px;
      }
      .message-card {
        background-color: #f8f9fa;
        border-left: 4px solid #4361ee;
        padding: 20px;
        border-radius: 0 8px 8px 0;
        margin-top: 15px;
      }
      .info-row {
        display: flex;
        margin-bottom: 15px;
        align-items: center;
      }
      .info-label {
        font-weight: 600;
        color: #3a0ca3;
        min-width: 80px;
      }
      .info-value {
        flex-grow: 1;
      }
      .footer {
        text-align: center;
        padding: 20px;
        color: #6c757d;
        font-size: 14px;
        border-top: 1px solid #e9ecef;
      }
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #4361ee;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        margin: 0 auto 20px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <div class="avatar">${payload.name.charAt(0).toUpperCase()}</div>
        <h1>New Message from Your Portfolio</h1>
      </div>
      
      <div class="email-body">
        <div class="info-row">
          <div class="info-label">From:</div>
          <div class="info-value">
            ${payload.name} &lt;${payload.email}&gt;
          </div>
        </div>
        
        <div class="info-row">
          <div class="info-label">Subject:</div>
          <div class="info-value">
            ${payload.subject}
          </div>
        </div>
        
        <div class="info-row">
          <div class="info-label">Date:</div>
          <div class="info-value">
            ${new Date().toLocaleString()}
          </div>
        </div>
        
        <div class="message-card">
          <p style="margin-top: 0;">${payload.message}</p>
        </div>
      </div>
      
      <div class="footer">
        <p>This message was sent via your portfolio contact form.</p>
        <p>You can reply directly to ${payload.name} at <a href="mailto:${payload.email}">${payload.email}</a></p>
      </div>
    </div>
  </body>
  </html>
  `
        });
        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error: unknown) {
        return NextResponse.json(
            { error: "Failed to send email", details: error },
            { status: 500 }
        );
    }
}