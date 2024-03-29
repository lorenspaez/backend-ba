import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CreatePostDto } from './dto';
import { UpdatePostDto } from './dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtGuard)
  @Post()
  createpost(
    @GetUser('name') name: string,
    @GetUser('id') userId: number,
    @GetUser('organizationName') organizationName: string,
    @Body() dto: CreatePostDto,
  ) {
    return this.postService.createPost(
      name,
      userId,
      organizationName,
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

  @UseGuards(JwtGuard)
  @Get('myposts')
  getPosts(
    @GetUser('id', ParseIntPipe) userId: number
    ) {
    return this.postService.getMyPosts(userId);
  }

  @Get('foundation/:organizationName')
  getPostByFoundationName(
    @Param('organizationName') organizatioName: string,
  ) {
    return this.postService.getPostByFoundationName(organizatioName);
  }

  @Get('category/:categoryName')
  getPostByCategoryName(
    @Param('categoryName') categoryName: string,
  ) {
    return this.postService.getPostByCategoryName(categoryName);
  }

  @Get('search/:text')
  search(
    @Param('text') text: string,
  ){
    return this.postService.searchPosts(text);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  editPostById(
    @GetUser('organizationName') organizationName: string,
    @Param('id', ParseIntPipe) postId: number,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postService.editPostById(organizationName, postId, dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePostById(
    @GetUser('organizationName') organizationName: string,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.postService.deletePostById(organizationName, postId);
  }
}
