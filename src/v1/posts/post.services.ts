import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createPostDTO } from './dtos/post.create.dto';
import { PostsRepository } from './post.repository';
import { Post } from './entities/post.entity';
import { userRequest } from '../users/interfaces/user.interfaces';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/user.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: PostsRepository,
    @InjectRepository(User) private usersRepository: UsersRepository,
  ) {}

  async createPost(post: createPostDTO, user: User) {
    try {
      const newPost = await this.postsRepository.create({
        ...post,
        user: user,
      });
      await this.postsRepository.save(newPost);

      return 'post created successfully!';
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.BAD_GATEWAY);
    }
  }

  getAllPosts() {
    return this.postsRepository.find({ relations: ['user'] });
  }

  async getPostById(id: string) {
    try {
      const post = await this.postsRepository.findOne({
        where: { id: id },
        relations: ['user'],
      });

      delete post.user.password
      delete post.user.confirmationCode
      if (!post) {
        throw new HttpException('No post found', 404);
      }
      return post;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.BAD_GATEWAY);
    }
  }

  // async updatePost(id: number, post: UpdatePostDto) {
  //   await this.postsRepository.update(id, post);
  //   const updatedPost = await this.postsRepository.findOne(id, { relations: ['author'] });
  //   if (updatedPost) {
  //     return updatedPost
  //   }
  //   throw new PostNotFoundException(id);
  // }
}
