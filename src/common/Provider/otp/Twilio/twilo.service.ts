import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Twilio } from 'twilio';
import { BraveoOtpService } from '../Bravo/bravo.service';

@Injectable()
export class TwilioOtpService {
  private twilioClient: Twilio;
  readonly bravoOtp: BraveoOtpService;

  constructor() {
    // Initialize Twilio client
    this.twilioClient = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  // Function to send OTP to email
  async sendOtpToEmail(email: string, otp: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your OTP Code From ${process.env.APP_NAME}`,
      text: `Your OTP code is ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('OTP sent to email');
    } catch (error) {
      // send otp from bravo
      console.log('Fallback to Brevo for sending OTP');
      try {
        const ttt = await this.bravoOtp.sendOtpToEmail(email, otp);
        return ttt;
      } catch (sendOtpError) {
        console.error('Failed to send OTP via Brevo:', sendOtpError);
      }
    }
  }

  // Function to send OTP to SMS
  async sendOtpToSms(phoneNumber: string, otp: string): Promise<void> {
    try {
      await this.twilioClient.messages.create({
        body: `Your OTP code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
      console.log('OTP sent via SMS');
    } catch (error) {
      console.error('Failed to send OTP via SMS:', error);
    }
  }

  // Function to send OTP to WhatsApp
  async sendOtpToWhatsApp(phoneNumber: string, otp: string): Promise<void> {
    try {
      await this.twilioClient.messages.create({
        body: `Your OTP code is ${otp}`,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${phoneNumber}`,
      });
      console.log('OTP sent via WhatsApp');
    } catch (error) {
      console.error('Failed to send OTP via WhatsApp:', error);
    }
  }
}
