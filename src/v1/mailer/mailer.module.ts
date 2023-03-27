import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { AppConfig } from './config/mailer.app.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: true,
          auth: {
            user: configService.get('AUTH_EMAIL'),
            pass: configService.get('AUTH_PASS'),
          },
          defaults: {
            from: '"nest-modules" <modules@nestjs.com>',
          },
          //   template: {
          //     dir: __dirname + '/templates',
          //     adapter: new PugAdapter(),
          //     options: {
          //       strict: true,
          //     },
          //   },
        },
      }),
    }),
  ],
  providers: [MailService, AppConfig],
  exports: [MailService],
})
export class MailModule {}
