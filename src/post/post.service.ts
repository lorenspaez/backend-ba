import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(
    userId: number,
    organizationName: string,
    dto: CreatePostDto,
  ) {
    const post =
      await this.prisma.post.create({
        data: {
          userId,
          organizationName,
          ...dto,
        },
      });
    return post;
  }

  getAllPosts() {
    return this.prisma.post.findMany({
      where: {
      },
    });
  }

  getPosts(userId: number) {
    return this.prisma.post.findMany({
      where: {
        userId,
      },
    });
  }

  getOrganizationPosts(organizationName: string) {
    return this.prisma.post.findMany({
      where: {
        organizationName,
      },
    });
  }

  getPostByName(
    orgName: string,
  ) {
    return this.prisma.post.findFirst({
      where: {
        organizationName: orgName
      },
    });
  }

  async editPostById(
    userId: number,
    postId: number,
    dto: UpdatePostDto,
  ) {
    // get the bookmark by id
    const post =
      await this.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

    // check if user owns the bookmark
    if (!post || post.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deletePostById(
    userId: number,
    postId: number,
  ) {
    const post =
      await this.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

    // check if user owns the bookmark
    if (!post || post.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}

