import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';
import { TypeOtp } from 'src/modules/otp/enum/typeOtp.snum';

@Injectable()
export class SendGridService {
  private readonly mailService: MailService;

  constructor() {
    this.mailService = new MailService();
    this.mailService.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendOtp(email: string, otp: string, type: TypeOtp): Promise<void> {
    const msg = {
      to: email,
      from: 'Investment@upvela.com',
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 6 minutes.`,
      html: this.templateForSend(otp, type),
    };

    try {
      await this.mailService.send(msg);
      console.log('OTP sent successfully');
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP');
    }
  }

  templateForSend(otp: string, type: TypeOtp): string {
    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f1f5f9;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid #e2e8f0;
          }
          h1 {
            color: #1a202c;
            font-size: 24px;
            text-align: center;
            margin-bottom: 20px;
          }
          .otp-code {
            font-size: 30px;
            font-weight: bold;
            color: #2b6cb0;
            text-align: center;
            margin: 20px 0;
          }
          .message {
            color: #4a5568;
            font-size: 16px;
            text-align: center;
            line-height: 1.6;
          }
          .footer {
            margin-top: 25px;
            font-size: 12px;
            color: #a0aec0;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to Investment App</h1>
          <p class="message">You requested a new OTP for verification ${type}. Please find it below:</p>
          <div class="otp-code">${otp}</div>
          <p class="message">Enter this code in the application to complete your verification ${type}.</p>
          <div class="footer">
            <p>If you did not request this, please disregard this email.</p>
            <p>&copy; ${new Date().getFullYear()} Investment. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
    return htmlContent;
  }
}
