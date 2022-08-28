import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditCategoryDto } from './dto';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(
    dto: CreateCategoryDto,
  ) {
    const category =
      await this.prisma.category.create({
        data: {
          ...dto,
        },
      });
    return category;
  }

  async getAllCategories() {

    const posts =
      await this.prisma.post.findMany({
        orderBy: [
          {
            createdAt: 'desc',
          }
        ]
      });

    const categories =
      await this.prisma.category.findMany({
      where: {
      },
    });

    return {posts, categories}
  }

  getCategoryById(
    categoryId: number,
  ) {
    return this.prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });
  }

  getCategoryByName(
    categoryName: string,
  ) {
    return this.prisma.category.findFirst({
      where: {
        name: categoryName,
      },
    });
  }

  async editCategoryById(
    categoryId: number,
    dto: EditCategoryDto,
  ) {
    const category = await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...dto,
      },
    });
    return category;
  }

  async deleteCategoryById(
    categoryId: number
  ) {
    const category =
      await this.prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });

    // check if user owns the bookmark
    if (categoryId !== categoryId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
