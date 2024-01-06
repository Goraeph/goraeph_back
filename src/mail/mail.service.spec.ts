import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MAIL_OPTIONS } from '../common/constants/constants';
import { MailOptions } from './mail.interfaces';
import { TestBed } from '@automock/jest';
import { InternalServerException } from '../common/exceptions/internal.exception';
describe('MailService', () => {
  let service: MailService;
  let mailerService: jest.Mocked<MailerService>;
  let mailOptions: jest.Mocked<MailOptions>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(MailService).compile();
    mailerService = unitRef.get(MailerService);
    mailOptions = unitRef.get(MAIL_OPTIONS);
    service = unit;

    mailOptions.senderMail = '123@naver.com';
    mailOptions.senderName = 'test';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendMail()', () => {
    it('should throw error when mailerService.sendMail() goes wrong.', async () => {
      mailerService.sendMail.mockResolvedValue('error');
      try {
        await service.sendMail('', '');
      } catch (error) {
        expect(mailerService.sendMail).toHaveBeenCalled();
        expect(error).toBeInstanceOf(InternalServerException);
      }
    });
    it.todo('should send mail properly.');
  });
});
