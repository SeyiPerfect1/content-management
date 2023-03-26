import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { loginInterface } from '../users/interfaces/user.interfaces';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.loginUser(username);

    if (!user) {
      throw new HttpException(
        'you dont have an account yet, kindly signup',
        404,
      );
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('email or password incorrect!!!', 400);
    }

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
