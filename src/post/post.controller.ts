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
    @GetUser('id') userId: number,
    @GetUser('organizationName') organizationName: string,
    @Body() dto: CreatePostDto,
  ) {
    return this.postService.createPost(
      userId,
      organizationName,
      dto,
    );
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('myposts')
  getPosts(@GetUser('id') userId: number) {
    return this.postService.getPosts(
      userId,
    );
  }

  @Get('orgposts')
  getOrganizationPosts(
    @GetUser('organizationName') organizationName: string,
    ) {
    return this.postService.getOrganizationPosts(
      organizationName,
    );
  }

  @Get(':organizationName')
  getPostByName(
    @Param('organizationName') organizatioName: string,
  ) {
    return this.postService.getPostByName(
      organizatioName
    );
  }

  @Patch(':id')
  editPostById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postService.editPostById(
      userId,
      postId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePostById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.postService.deletePostById(
      userId,
      postId,
    );
  }
}
