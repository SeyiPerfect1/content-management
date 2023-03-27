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
    try {
      user.email.toLowerCase();

      // const existUser = await this.usersRepository.findOne({
      //   where: { email: user.email.toLowerCase() },
      // });

      // if (existUser) {
      //   throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      // }

      user.confirmationCode = await generateString(20);

      const hashedPassword = await bcrypt.hash(user.password, 10);

      await this.usersRepository.save({
        ...user,
        password: hashedPassword,
      });

      await this.mailService.sendConfirmationEmail(user);

    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    } finally {
      return 'User created successfully! Please check your mail';
    }
  }

  async loginUser(username: string) {
    try {
      return await this.usersRepository.findOne({
        select: [
          'id',
          'firstName',
          'lastName',
          'password',
          'email',
          'isActive',
        ],
        where: {
          email: username.toLowerCase(),
        },
      });
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    } 
  }

  async verifyUserEmail(confirmationCode: string) {
    const confimUser = await this.usersRepository.findOne({
      where: { confirmationCode: confirmationCode },
    });

    if (!confimUser) {
      throw new HttpException('Invalid Verification Code', 404);
    }

    confimUser.isActive = true;
    confimUser.confirmationCode = '';

    await this.usersRepository.save(confimUser);

    return 'Verification Successful.You can now login';
  }

  // updateUser(){

  // }

  // deleteUser(){}
}
