import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from './entity/create-post.dto';
import { PostEntity } from './entity/post.entity';
import { UpdatePostDto } from './entity/update-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts(@Query() queries) {
    return this.postService.getAllPosts(queries);
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  @Post()
  createPost(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }

  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, data);
  }

  @Delete(':id')
  softDeletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.softDeletePost(id);
  }
}
