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
  async sendMail(to: string) {
    this.mailerService
      .sendMail({
        to,
        from: this.options.senderMail,
        subject: 'test mail',
        text: 'hi?',
      })
      .then(() => {})
      .catch(() => {
        throw new InternalServerException();
      });
  }
}
