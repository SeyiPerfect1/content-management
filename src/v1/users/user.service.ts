import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDTO } from './dtos/user.create.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './user.repository';
import { generateString } from '../utilities/generateCode.utility';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mailer/mailer.service';
import { updateUserDTO } from './dtos/user.update.dto';
import { userRequest } from './interfaces/user.interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: UsersRepository,
    private readonly mailService: MailService,
  ) {}

  async getUserProfile(user: userRequest) {
    try {
      const userProfile = await this.usersRepository.findOne({
        select: ['id', 'firstName', 'lastName', 'email', 'isActive'],
        where: { id: user.userId },
      });
      return userProfile;
    } catch (error) {
      throw new HttpException('internal server error', HttpStatus.BAD_GATEWAY);
    }
  }

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

    return 'password reset link sent, kindly check your mail';
  }

  async resetPassword(confirmationCode: string, password: string) {
    const confirmUser = await this.usersRepository.findOne({
      where: { confirmationCode: confirmationCode },
    });

    if (!confirmUser) {
      throw new HttpException('Invalid confirmation code!!!', 404);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    confirmUser.password = hashedPassword;
    confirmUser.confirmationCode = '';
    await this.usersRepository.save(confirmUser);

    return 'password reset successful!!!';
  }

  async updateUser(userData: updateUserDTO, user: userRequest) {
    try {
      const userDetails = await this.usersRepository.findOne({
        select: ['id', 'firstName', 'lastName', 'email', 'isActive'],
        where: { id: user.userId },
      });

      const updatedUser = { ...userDetails, ...userData };
      await this.usersRepository.save(updatedUser);

      return updatedUser;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.BAD_GATEWAY);
    }
  }

  async deleteUser(user: userRequest) {
    try {
      await this.usersRepository.delete({ id: user.userId });

      return 'User deleted successfully!';
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.BAD_GATEWAY);
    }
  }
}
