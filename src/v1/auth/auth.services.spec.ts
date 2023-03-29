import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/user.service';
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