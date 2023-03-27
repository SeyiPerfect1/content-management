import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/auth.jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/auth.jwt.local_auh_guard';
import { createUserDTO } from './dtos/user.create.dto';
import { updateUserDTO } from './dtos/user.update.dto';
import {
  emailVerificationParam,
  forgotPassword,
  resetPassword,
  resetpasswordparam,
} from './interfaces/user.interfaces';
import { UsersService } from './user.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async findUser(@Request() req) {
    console.log(req.user);
    return await this.usersService.getUserProfile(req.user);
  }

  // signup a user
  @Post('/signup')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() userData: createUserDTO) {
    return await this.usersService.createUser(userData);
  }

  // login a user
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  // send email confirmation to user on signup
  @Get('/confirm/:confirmationCode')
  async confirmMail(@Param() param: emailVerificationParam) {
    return await this.usersService.verifyUserEmail(param.confirmationCode);
  }

  // send password resent link to user
  @Post('/forgot_password')
  async forgotPasswordMail(@Body() userEmail: forgotPassword) {
    return await this.usersService.forgotPassword(userEmail.email);
  }

  //  rest a user password
  @Post('/reset_password/:confirmationCode')
  async ResetPasswordMail(
    @Body() userpassword: resetPassword,
    @Param() param: resetpasswordparam,
  ) {
    return await this.usersService.resetPassword(
      param.confirmationCode,
      userpassword.password,
    );
  }

  // update user profile
  @UseGuards(JwtAuthGuard)
  @Put('/update_profile')
  async updateProfile(@Body() userData: updateUserDTO, @Request() req) {
    return await this.usersService.updateUser(userData, req.user);
  }

  // delete a user
  @UseGuards(JwtAuthGuard)
  @Delete('/delete_profile')
  async deleteProfile(@Request() req) {
    return await this.usersService.deleteUser(req.user);
  }
}
