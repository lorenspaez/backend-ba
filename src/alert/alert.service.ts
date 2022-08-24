import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SetAlertKeyDto } from './dto';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) {}

  async createAlert(
    userId: number,
    userName: string,
    dto: CreateAlertDto,
  ) {
    if (userId == null
      ){
        const alert =
      await this.prisma.alert.create({
        data: {
          userName,
          ...dto,
        },
      });
    return alert;
      }
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

  getMyAlerts(userId: number) {
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

  async setAlertKey(
    alertId: number,
    userName: string,
    //userId: number,
    dto: SetAlertKeyDto,
  ) {
    const alert =
      await this.prisma.alert.findUnique({
        where: {
          id: alertId,
        },
      });
    return this.prisma.alert.update({
      where: {
        id: alertId,
      },
      data: {
        alertKey: String(alertId)+userName,
        ...dto,
      },
    });
  }

  async editAlertByKey(
    alertKey: string,
    dto: UpdateAlertDto,
  ) {
    const alert =
      await this.prisma.alert.findFirst({
        where: {
          alertKey: alertKey,
        },
      });

    return this.prisma.alert.update({
      where: {
        id: alert.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteAlertByKey(
    alertKey: string,
  ) {
    const alert =
      await this.prisma.alert.findFirst({
        where: {
          alertKey: alertKey,
        },
      });
    /*
    if (!alert || alert.userId !== userId)
      throw new ForbiddenException(
        'No eres el propietario de la Alerta',
      );
    */
    await this.prisma.alert.delete({
      where: {
        id: alert.id,
      },
    });
  }
}

