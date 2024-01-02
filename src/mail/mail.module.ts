import { DynamicModule, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailOptions } from './mail.interfaces';
import { MAIL_OPTIONS } from 'src/common/constants/constants';

@Module({
  providers: [MailService],
  exports: [MailModule],
})
export class MailModule {
  static forRoot(options: MailOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: MAIL_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
