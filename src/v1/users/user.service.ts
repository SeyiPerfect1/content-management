import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDTO } from './dtos/user.create.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './user.repository';
import { generateString } from '../utilities/user.utility';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: UsersRepository,
  ) {}

  // getAllUsers(): Cat[] {
  //   return this.cats;
  // }

  // getUser() {

  // }

  async createUser(user: createUserDTO) {
    user.email.toLowerCase();

    user.confirmationCode = await generateString(15);

    const hashedPassword = await bcrypt.hash(user.password, 10);

    try {
      return await this.usersRepository.save({
        ...user,
        password: hashedPassword,
      });
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
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
          email: username,
        },
      });
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    }
  }

  // updateUser(){

  // }

  // deleteUser(){}
}
