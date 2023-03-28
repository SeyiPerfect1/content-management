import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/user.module';
import { UsersRepository } from '../users/user.repository';
import { Post } from './entities/post.entity';
import { PostsController } from './post.controller';
import { PostsRepository } from './post.repository';
import { PostsService } from './post.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostsRepository, User, UsersRepository]),
    AuthModule,
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
