import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(
    userName: string,
    userId: number,
    organizationName: string,
    categoryName: string,
    dto: CreatePostDto,
  ) {
    const org =
      await this.prisma.organization.findUnique({
        where: {
          name: organizationName
        }
      })
    const cat =
      await this.prisma.category.findUnique({
        where: {
          name: categoryName
        }
      })
    const post =
      await this.prisma.post.create({
        data: {
          userName: userName,
          userId: userId,
          categoryName: categoryName,
          categoryId: cat.id,
          organizationName: organizationName,
          organizationId: org.id,
          ...dto,
        },
      });
    return post;
  }

  getPostById(postId: number) {
    return this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  }

  getAllPosts() {
    return this.prisma.post.findMany({
      where: {
      },
    });
  }

  getMyPosts(userId: number) {
    return this.prisma.post.findMany({
      where: {
        userId,
      },
    });
  }

  getPostByFoundationName(
    organizationName: string,
  ) {
    return this.prisma.post.findMany({
      where: {
        organizationName: organizationName
      },
    });
  }

  getPostByCategoryName(
    categoryName: string,
  ) {
    return this.prisma.post.findMany({
      where: {
        categoryName: categoryName
      },
    });
  }

  async editPostById(
    organizationName: string,
    postId: number,
    dto: UpdatePostDto,
  ) {
    const post =
      await this.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

    if (!post || post.organizationName !== organizationName)
      throw new ForbiddenException(
        'No perteneces a esta Fundación',
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
    organizationName: string,
    postId: number,
  ) {
    const post =
      await this.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

    if (!post || post.organizationName !== organizationName)
      throw new ForbiddenException(
        'No perteneces a esta Fundación',
      );

    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}

