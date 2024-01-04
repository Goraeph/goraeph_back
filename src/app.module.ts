import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { databaseProviders } from './database/database.providers';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';
import { CurrentUserMiddleware } from './common/middlewares/current-user.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersService } from './users/users.service';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'prod' ? '.env.prod' : '.env.dev',
      validationSchema: joi.object({
        DATABASE_HOST: joi.string().required(),
        DATABASE_PORT: joi.string().required(),
        DATABASE_USERNAME: joi.string().required(),
        DATABASE_PASSWORD: joi.string().required(),
        DATABASE_NAME: joi.string().required(),
        JWT_SECRET_KEY: joi.string().required(),
        SMTP_USER: joi.string().required(),
        SMTP_PASSWORD: joi.string().required(),
        SMTP_DOMAIN: joi.string().required(),
        SMTP_SENDER_EMAIL: joi.string().required(),
        SMTP_SENDER_NAME: joi.string().required(),
      }),
    }),
    CommonModule,
    JwtModule.forRoot({
      secretKey: process.env.JWT_SECRET_KEY,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: `smtps://${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_DOMAIN}`,
        defaults: {
          from: `"${process.env.SMTP_SENDER_NAME} <${process.env.SMTP_SENDER_EMAIL}>"`,
        },
      }),
    }),
    MailModule.forRoot({
      senderMail: process.env.SMTP_SENDER_EMAIL,
      senderName: process.env.SMTP_SENDER_NAME,
    }),
    AuthModule,
    TokenModule,
  ],
  controllers: [],
  providers: [...databaseProviders, JwtService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
