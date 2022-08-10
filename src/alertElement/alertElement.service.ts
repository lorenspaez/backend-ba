import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditAlertElementDto } from './dto';
import { CreateAlertElementDto } from './dto';

@Injectable()
export class AlertElementService {
  constructor(private prisma: PrismaService) {}

  async createElement(
    dto: CreateAlertElementDto,
  ) {
    const element =
      await this.prisma.alertElement.create({
        data: {
          ...dto,
        },
      });
    return element;
  }

  getAllElements() {
    return this.prisma.alertElement.findMany({
      where: {
      },
    });
  }

  getElementById(
    elementId: number,
  ) {
    return this.prisma.alertElement.findFirst({
      where: {
        id: elementId,
      },
    });
  }

  async editElementById(
    elementId: number,
    dto: EditAlertElementDto,
  ) {
    const element = await this.prisma.alertElement.update({
      where: {
        id: elementId,
      },
      data: {
        ...dto,
      },
    });
    return element;
  }

  async deleteElementById(
    elementId: number
  ) {
    const category =
      await this.prisma.alertElement.findUnique({
        where: {
          id: elementId,
        },
      });

    // check if user owns the bookmark
    if (elementId !== elementId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.alertElement.delete({
      where: {
        id: elementId,
      },
    });
  }
}
