// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
import * as process from 'process';
import { HttpException } from '@nestjs/common';

export default class MailerService {
  private transporter: any;
  private mailOptions: { subject: string; from: any; to: string; text: string };
  constructor(
    private readonly subject: string,
    private readonly text: string,
    private readonly destination: string,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    this.mailOptions = {
      from: process.env.SMTP_USER,
      to: this.destination,
      subject: this.subject,
      text: this.text,
    };
  }
  async sendMail(): Promise<boolean | HttpException> {
    try {
      await this.transporter.sendMail(this.mailOptions);
      return true;
    } catch (error) {
      console.log(error);
      return new HttpException('Error sending email', 500);
    }
  }
}
