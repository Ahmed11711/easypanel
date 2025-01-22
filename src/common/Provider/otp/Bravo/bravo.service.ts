import { PhoneNumberSolution } from './../../../../../node_modules/twilio/lib/rest/pricing/v1/phoneNumber.d';
import { PhoneNumber } from './../../../../../node_modules/twilio/lib/interfaces.d';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@sendinblue/client';
import { join } from 'path';
import { compile } from 'handlebars';
import { promises as fs } from 'fs';

@Injectable()
export class BraveoOtpService {
  private transactionalEmailsApi: TransactionalEmailsApi;
  private readonly brevoApiKey: string;

  constructor() {
    this.transactionalEmailsApi = new TransactionalEmailsApi();
    this.brevoApiKey = process.env.BREVO_API_KEY;
    this.transactionalEmailsApi.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      this.brevoApiKey,
    );
  }

  // Function to send OTP via Email
  async sendOtpToEmail(email: string, otp: string) {
    const msg: SendSmtpEmail = {
      sender: { name: process.env.APP_NAME, email: process.env.BREVO_EMAIL },
      to: [{ email: email }],
      subject: process.env.APP_NAME,
      htmlContent: this.templateForSend(otp),
    };

    try {
      await this.transactionalEmailsApi.sendTransacEmail(msg);
      console.log('send otp success');
    } catch (error) {
      // send to anther provider
      // this.sendForSupport();
      console.error('Error sending OTP to email:', error);
    }
  }
  // Function to re send OTP via Email

  async resendOtpToEmail(email: string, otp: string) {
    const msg: SendSmtpEmail = {
      sender: { name: process.env.BREVO_NAME, email: process.env.BREVO_EMAIL },
      to: [{ email: email }],
      subject: process.env.APP_NAME,
      htmlContent: this.templateForReSend(otp),
    };

    try {
      await this.transactionalEmailsApi.sendTransacEmail(msg);
    } catch (error) {
      // send to anther provider

      // this.sendForSupport();
      console.error('Error sending OTP to email:', error);
    }
  }

  // Function to send OTP via SMS
  async sendOtpToSms(phoneNumber: string, otp: string): Promise<void> {
    const smsPayload = {
      sender: process.env.BREVO_SMS_SENDER,
      recipient: [`+${phoneNumber}`],
      content: `Your OTP code is: ${otp}`,
    };

    try {
      const response = await axios.post(
        'https://api.brevo.com/v3/transactionalSMS/sms',
        smsPayload,
        {
          headers: {
            'api-key': this.brevoApiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('OTP sent via SMS:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response from Brevo:', error.response.data);
      } else {
        console.error('Error sending OTP via SMS:', error.message);
      }
    }
  }
  // Function to send OTP via WhatsApp
  async sendOtpToWhatsApp(phoneNumber: string, otp: string) {
    try {
      const response = await axios.post(
        'https://api.brevo.com/v3/whatsapp/sendMessage',
        {
          templateId: 123, // Replace with your actual template ID
          senderNumber: process.env.BREVO_WHATSAPP_SENDER, // International format with country code
          contactNumbers: [phoneNumber], // Ensure it's in the international format
          parameters: {
            otp: otp, // Assuming your template has a variable for this OTP
          },
        },
        {
          headers: {
            'api-key': this.brevoApiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('OTP sent via WhatsApp:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
      } else {
        console.error('Error sending OTP via WhatsApp:', error.message);
      }
    }
  }

  // Support Function for additional checks or info
  async sendForSupport(): Promise<void> {
    const email = process.env.EMAIL_SUPPORT;
    const otp = 'Pleas Check Brave For Send Email';
    await this.sendOtpToEmail(email, otp);
  }
  async templateSend(email: string, otp: string): Promise<string> {
    // Ensure it returns a string
    const templatePath = join(__dirname, 'views', 'otp-email.hbs');

    try {
      const templateSource = await fs.readFile(templatePath, 'utf-8');
      const template = compile(templateSource);
      const htmlTemplate = template({ otp });

      return htmlTemplate; // Ensure the rendered HTML is returned
    } catch (err) {
      console.error('Error reading the template file:', err);
      throw new Error('Template not found');
    }
  }

  templateForSend(otp: string): string {
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
          <h1>Welcome to Investment</h1>
          <p class="message">You requested a new OTP for verification. Please find it below:</p>
          <div class="otp-code">${otp}</div>
          <p class="message">Enter this code in the application to complete your verification process.</p>
          <div class="footer">
            <p>If you did not request this, please disregard this email.</p>
            <p>&copy; ${new Date().getFullYear()} Investment. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
    return htmlContent; // Return the HTML content for resending OTP
  }
  templateForReSend(otp: string): string {
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
          <h1>Welcome to Investment</h1>
          <p class="message">You requested a new OTP for verification. Please find it below:</p>
          <div class="otp-code">${otp}</div>
          <p class="message">Enter this code in the application to complete your verification process.</p>
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
