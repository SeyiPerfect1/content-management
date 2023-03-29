import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mailer/mailer.service';
import { createUserDTO } from './dtos/user.create.dto';
import { User } from './entities/user.entity';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

describe('UserController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let mailService: MailService;
  let usersRepository: Repository<User>

  const data: createUserDTO = {
    firstName: 'Oluseyi',
    lastName: 'Adeegbe',
    email: 'adeegbeoluseyi',
    password: '@Password1',
    confirmationCode: '643eufjdwRRRERGEt3480',
  };



  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        MailService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn()
            // find: jest.fn()
          },
        },
      ],
    }).compile();

    mailService = moduleRef.get<MailService>(MailService);
    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    usersRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User))
  });

  describe('createUser', () => {
    it('should return user signup success msg', async () => {
      const result = 'User created successfully! Please check your mail';
      jest
        .spyOn(usersService, 'createUser')
        .mockImplementation(async () => result);

      expect(await usersController.createUser(data)).toBe(result);
    });
  });

    describe('getUser', () => {
    it('should return user profile', async () => {
      const data:string = 'ceuo-fheo-38fh-viee'
      const result: User = {
        id: 'ceuo-fheo-38fh-viee',
        firstName: 'Oluseyi',
        lastName: 'Adeegbe',
        email: 'adeegbeoluseyi',
        password: '@Password1',
        confirmationCode: '643eufjdwRRRERGEt3480',
        isActive: true,
        posts: [],
        createdAt: new Date(),
        updatedAt: new Date
      }
      jest
        .spyOn(usersService, 'getUserProfile')
        .mockImplementation(async () => result);

      expect(await usersController.findUser(data)).toBe(result);
    });
  });
});
