import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDTO } from './dtos/user.create.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './user.repository';
import { generateString } from '../utilities/generateCode.utility';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mailer/mailer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: UsersRepository,
    private readonly mailService: MailService,
  ) {}

  // getAllUsers(): Cat[] {
  //   return this.cats;
  // }

  // getUser() {

  // }

  async createUser(user: createUserDTO) {
    user.email.toLowerCase();

    const existUser = await this.usersRepository.findOne({
      where: { email: user.email.toLowerCase() },
    });

    if (existUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    user.confirmationCode = await generateString(20);

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });

    await this.mailService.sendConfirmationEmail(user);
    return 'User created successfully! Please check your mail';
  }

  async loginUser(username: string) {
    let user = await this.usersRepository.findOne({
      select: ['id', 'firstName', 'lastName', 'password', 'email', 'isActive'],
      where: {
        email: username.toLowerCase(),
      },
    });

    if (user.isActive === false) {
      throw new HttpException(
        'User not yet verified. Pls, kindly check your mail',
        400,
      );
    } else {
      return user;
    }
  }

  async verifyUserEmail(confirmationCode: string) {
    const confirmUser = await this.usersRepository.findOne({
      where: { confirmationCode: confirmationCode },
    });

    if (!confirmUser) {
      throw new HttpException('Invalid Verification Code', 404);
    }

    confirmUser.isActive = true;
    confirmUser.confirmationCode = '';

    await this.usersRepository.save(confirmUser);

    return 'Verification Successful.You can now login';
  }

  async forgotPassword(email: string) {
    console.log(email)
    const confirmUser = await this.usersRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!confirmUser) {
      throw new HttpException(
        'This email has not been registered, Kindly signup',
        404,
      );
    }

    confirmUser.confirmationCode = await generateString(20);
    await this.usersRepository.save(confirmUser);

    await this.mailService.sendForgotPasswordEmail(confirmUser);

    return "password reset link sent, kindly check your mail"
  }

  // updateUser(){

  // }

  // deleteUser(){}
}
