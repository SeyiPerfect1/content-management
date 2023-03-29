import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createPostDTO } from './dtos/post.create.dto';
import { PostsRepository } from './post.repository';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/user.repository';
import { updatePostDTO } from './dtos/post.update.dto';

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
    const post = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!post) {
      throw new HttpException('No post found', 404);
    } else {
      delete post.user.password;
      delete post.user.confirmationCode;

      post.viewCount+= 1
      await this.postsRepository.save(post)
      return post;
    }
  }

  async updatePost(post: updatePostDTO, id: string, userId:string) {
    try {
      const queriredPost = await this.postsRepository.findOne({
        where: { id: id },
        relations: ['user'],
      });

      if (!queriredPost) {
        throw new HttpException('No post found', 404);
      } 

      if(queriredPost.user.id !== userId){
        throw new HttpException('You are not the owner of the post', HttpStatus.FORBIDDEN)
      }

      await this.postsRepository.update(id, post);
      const updatedPost = await this.postsRepository.findOne({
        where: { id: id },
        relations: ['user'],
      });
      if (updatedPost) {
        delete updatedPost.user.password;
        delete updatedPost.user.confirmationCode;
        return updatedPost;
      }
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.BAD_GATEWAY);
    }
  }

  async deletePost(id: string, userId:string) {
    const queriredPost = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!queriredPost) {
      throw new HttpException('No post found', 404);
    } 

    if(queriredPost.user.id !== userId){
      throw new HttpException('You are not the owner of the post', HttpStatus.FORBIDDEN)
    }

    await this.postsRepository.delete({ id: id })
    
    return 'Post deleted successfully!'
  }
}
