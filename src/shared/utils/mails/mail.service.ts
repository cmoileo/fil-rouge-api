import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import * as path from 'path';
import { HttpException } from '@nestjs/common';
import * as process from 'process';

export default class MailerService {
  private transporter: any;
  private mailOptions: {
    from: string;
    to: string;
    subject: string;
    template: string;
    context: any;
  };

  constructor(
    private readonly subject: string,
    private readonly destination: string,
    private readonly templateName: string,
    private readonly context: any,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const templatesDir = path.join(
      process.cwd(),
      'src',
      'shared',
      'utils',
      'mails',
      'templates',
    );

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.hbs',
          partialsDir: templatesDir,
          layoutsDir: templatesDir,
          defaultLayout: false,
        },
        viewPath: templatesDir,
        extName: '.hbs',
      }),
    );

    this.mailOptions = {
      from: process.env.SMTP_USER,
      to: this.destination,
      subject: this.subject,
      template: this.templateName,
      context: this.context,
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
