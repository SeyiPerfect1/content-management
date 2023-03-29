import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
// import { UsersModule } from '../../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
// import { DatabaseModule } from '../../database/database.module';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from '../database/typeorm.module';
import { UsersModule } from '../users/user.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/user.service';
import { dbConfigValidationSchema } from '../database/config/typeorm.config.validation';
import { jwtValidationSchema } from './config/auth.config.validation';
import { mockedJwtService } from '../utilities/mocks/jwt.service';
import { mockedConfigService } from '../utilities/mocks/config.service';
 
describe('The AuthenticationService', () => {
  let authService: AuthService;

  let findOne: jest.Mock;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
            providers: [
              UsersService,
              AuthService,
              {
                provide: ConfigService,
                useValue: mockedConfigService
              },
              {
                provide: JwtService,
                useValue: mockedJwtService
              },
              {
                provide: getRepositoryToken(User),
                useValue: {}
              }
            ],
          }).compile();
    authService = await module.get<AuthService>(AuthService);
  })
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(
        typeof authService.login(userId)
      ).toEqual('string')
    })
  })
});