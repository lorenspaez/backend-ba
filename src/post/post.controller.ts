import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CreatePostDto } from './dto';
import { UpdatePostDto } from './dto';
import { PostService } from './post.service';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createpost(
    @GetUser('userName') userName: string,
    @GetUser('id') userId: number,
    @GetUser('organizationName') organizationName: string,
    @Param('categoryName') categoryName: string,
    @Body() dto: CreatePostDto,
  ) {
    return this.postService.createPost(
      userName,
      userId,
      organizationName,
      categoryName,
      dto);
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(
    @Param('id', ParseIntPipe) id: number,
    ) {
    return this.postService.getPostById(id);
  }

  @Get('myposts')
  getPosts(
    @GetUser('id') userId: number
    ) {
    return this.postService.getMyPosts(userId);
  }

  @Get('foundation/:organizationName')
  getPostByFoundationName(
    @Param('organizationName') organizatioName: string,
  ) {
    return this.postService.getPostByFoundationName(organizatioName);
  }

  @Get('category/:organizationName')
  getPostByCategoryName(
    @Param('categoryName') categoryName: string,
  ) {
    return this.postService.getPostByCategoryName(categoryName);
  }

  @Patch(':id')
  editPostById(
    @GetUser('organizationName') organizationName: string,
    @Param('id', ParseIntPipe) postId: number,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postService.editPostById(organizationName, postId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePostById(
    @GetUser('organizationName') organizationName: string,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.postService.deletePostById(organizationName, postId);
  }
}
