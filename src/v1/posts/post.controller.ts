import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/auth.jwt-auth.guard';
import { createPostDTO } from './dtos/post.create.dto';
import { PostsService } from './post.services';

@Controller('api/v1/posts')
export class PostsController {
  constructor(
    private postService: PostsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  async createPost(@Body() postDetails: createPostDTO, @Request() req) {
    return this.postService.createPost(postDetails, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getPosts() {
    return await this.postService.getAllPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getPost(@Param()  param) {
    return await this.postService.getPostById(param.id);
  }


}