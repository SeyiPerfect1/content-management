import { Module } from '@nestjs/common';
import { PostsController } from './post.controller';
import { PostsService } from './post.services';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}