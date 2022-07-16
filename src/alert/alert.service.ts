import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) {}

  async createAlert(
    userId: number,
    userName: string,
    dto: CreateAlertDto,
  ) {
    const alert =
      await this.prisma.alert.create({
        data: {
          userId,
          userName,
          ...dto,
        },
      });
    return alert;
  }

  getAllAlerts() {
    return this.prisma.alert.findMany({
      where: {
      },
    });
  }

  getAlerts(userId: number) {
    return this.prisma.alert.findMany({
      where: {
        userId,
      },
    });
  }

  getAlertById(
    alertId: number,
  ) {
    return this.prisma.alert.findFirst({
      where: {
        id: alertId
      },
    });
  }

  async editAlertById(
    userId: number,
    alertId: number,
    dto: UpdateAlertDto,
  ) {
    // get the bookmark by id
    const alert =
      await this.prisma.alert.findUnique({
        where: {
          id: alertId,
        },
      });

    // check if user owns the bookmark
    if (!alert || alert.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.alert.update({
      where: {
        id: alertId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteAlertById(
    userId: number,
    alertId: number,
  ) {
    const alert =
      await this.prisma.alert.findUnique({
        where: {
          id: alertId,
        },
      });

    // check if user owns the bookmark
    if (!alert || alert.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.alert.delete({
      where: {
        id: alertId,
      },
    });
  }
}

