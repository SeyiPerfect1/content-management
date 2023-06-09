import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.jwt-auth.guard';
import { createPostDTO } from './dtos/post.create.dto';
import { updatePostDTO } from './dtos/post.update.dto';
import { PostsService } from './post.services';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private postService: PostsService) {}

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
  async getPost(@Param() param) {
    return await this.postService.getPostById(param.id);
  }

  // update user profile
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updatePost(@Body() postData: updatePostDTO, @Request() req, @Param() param) {
    return await this.postService.updatePost(postData, param.id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteProfile(@Request() req, @Param() param) {
    return await this.postService.deletePost(param.id, req.user.userId);
  }
}
