import {
  Body,
  Controller,
  Get,
  HttpCode,
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
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user)
    return this.authService.login(req.user);
  }
}
