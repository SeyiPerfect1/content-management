import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/auth.jwt.local_auh_guard';
import { createUserDTO } from './dtos/user.create.dto';
import { param } from './interfaces/user.interfaces';
import { UsersService } from './user.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get()
  // findAll(): string {
  //   return 'This action returns all users';
  // }

  @Post('/signup')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() userData: createUserDTO) {
    return await this.usersService.createUser(userData);
  }

  @Get('/confirm/:confirmationCode')
  async confirmMail(@Param() param: param) {
    console.log(param.confirmationCode)
    return this.usersService.verifyUserEmail(param.confirmationCode)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
