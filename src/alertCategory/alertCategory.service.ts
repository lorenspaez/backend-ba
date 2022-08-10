import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditAlertCategoryDto } from './dto';
import { CreateAlertCategoryDto } from './dto';

@Injectable()
export class AlertCategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(
    dto: CreateAlertCategoryDto,
  ) {
    const category =
      await this.prisma.alertCategory.create({
        data: {
          ...dto,
        },
      });
    return category;
  }

  getAllCategories() {
    return this.prisma.alertCategory.findMany({
      where: {
      },
    });
  }

  getCategoryById(
    categoryId: number,
  ) {
    return this.prisma.alertCategory.findFirst({
      where: {
        id: categoryId,
      },
    });
  }

  async editCategoryById(
    categoryId: number,
    dto: EditAlertCategoryDto,
  ) {
    const category = await this.prisma.alertCategory.update({
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
      await this.prisma.alertCategory.findUnique({
        where: {
          id: categoryId,
        },
      });

    // check if user owns the bookmark
    if (categoryId !== categoryId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.alertCategory.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
