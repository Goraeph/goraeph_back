import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MAIL_OPTIONS } from '../common/constants/constants';
import { MailOptions } from './mail.interfaces';
import { TestBed } from '@automock/jest';
describe('MailService', () => {
  let service: MailService;
  let mailerService: jest.Mocked<MailerService>;
  let mailOptions: jest.Mocked<MailOptions>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(MailService).compile();
    mailerService = unitRef.get(MailerService);
    mailOptions = unitRef.get(MAIL_OPTIONS);
    service = unit;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendMail()', () => {
    it.todo('should throw error when mailerService.sendMail() goes wrong.');
    it.todo('should send mail properly.');
  });
});
