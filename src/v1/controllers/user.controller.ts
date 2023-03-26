import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createUserDTO } from '../dtos/user.create.dto';
import { UsersService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

  @Post('/signup')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() userData: createUserDTO) {
    return await this.usersService.createUser(userData);
  }
}
