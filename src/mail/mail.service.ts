import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { MAIL_OPTIONS } from 'src/common/constants/constants';
import { MailOptions } from './mail.interfaces';
import { InternalServerException } from 'src/common/exceptions/internal.exception';

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_OPTIONS) private options: MailOptions,
    private readonly mailerService: MailerService,
  ) {}
  async sendMail(to: string, code: string) {
    this.mailerService
      .sendMail({
        to,
        from: this.options.senderMail,
        subject: 'Send Confirmation Email from goraeph',
        text: `Hello ${to}. This is Your Confirmation Email from goraeph. If you want to proceed your sign up process, please click link down below.`,
        html: `<a href="http://localhost:3000/auth/${code}">Link</a>`,
      })
      .then(() => {})
      .catch(() => {
        throw new InternalServerException();
      });
  }
}
