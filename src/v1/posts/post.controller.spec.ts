import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mailer/mailer.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/user.service';
import { createPostDTO } from './dtos/post.create.dto';
import { Post } from './entities/post.entity';
import { PostsController } from './post.controller';
import { PostsService } from './post.services';


describe('PostController', () => {
  let postsController: PostsController;
  let usersService: UsersService;
  let postsService: PostsService;
  let postsRepository: Repository<Post>
  let usersRepository: Repository<User>
  let mailService: MailService;

  const data: createPostDTO = {
    title: 'My Story',
    description: 'Story of my life',
    body: 'vsj vsi vuoww vwrr wohf vwoh vwoh vwroh',
    userId: '6453-4757-9457-hfy4'
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        UsersService,
        MailService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            save: jest.fn(),
            // find: jest.fn().mockResolvedValue([mockContact])
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            // find: jest.fn().mockResolvedValue([mockContact])
          },
        }
      ],
    }).compile();

    postsService = moduleRef.get<PostsService>(PostsService);
    usersService = moduleRef.get<UsersService>(UsersService);
    mailService = moduleRef.get<MailService>(MailService);
    postsController = moduleRef.get<PostsController>(PostsController);
    postsRepository = moduleRef.get<Repository<Post>>(getRepositoryToken(Post))
    usersRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User))
  });

  describe('createPost', () => {
    it('should return post creation success msg', async () => {

      const result = 'post created successfully!';
      jest
        .spyOn(postsService, 'createPost')
        .mockImplementation(async () => result);

      expect(await postsController.createPost(data, data.userId)).toBe(result);
    });
  });
});
