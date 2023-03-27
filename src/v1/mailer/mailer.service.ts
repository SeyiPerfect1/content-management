import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/v1/users/entities/user.entity';
import { createUserDTO } from 'src/v1/users/dtos/user.create.dto';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/mailer.app.config';

@Injectable()
export class MailService {
  static configService: ConfigService
  constructor(private readonly mailerService: MailerService) {}

  public async sendConfirmationEmail(user: createUserDTO) {
    this.mailerService
      .sendMail({
        to: user.email, // list of receivers
        from: AppConfig.get('AUTH_EMAIL'), // sender address
        subject: 'Please confirm your account', // Subject line
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${user.firstName} ${user.lastName}</h2>
        <p>Verify your email address to complete the signup and login to your account</p>
        <a href=${AppConfig.get('BASE_URL')}/api/v1/users/confirm/${user.confirmationCode}> Click here</a>`,
  }) // HTML body content
      .then(() => {})
      .catch((error) => {
        throw new Error(error)
      });
  }

  public async sendForgotPasswordEmail(user: createUserDTO) {
    this.mailerService
      .sendMail({
        to: user.email, // list of receivers
        from: AppConfig.get('AUTH_EMAIL'), // sender address
        subject: 'Password Reset Link', // Subject line
        html: `<h1>Password Reset</h1>
        <h2>Hello ${user.firstName} ${user.lastName}</h2>
        <p>Click on the link to reset your password</p>
        <a href=${AppConfig.get('BASE_URL')}/api/v1/users/reset_password/${user.confirmationCode}> Click here</a>`,
  }) // HTML body content
      .then(() => {})
      .catch((error) => {
        throw new Error(error)
      });
  }
}