import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SetAlertKeyDto } from './dto';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) {}

  async createAlert(
    userName: string,
    dto: CreateAlertDto,
  ) {
    const alert =
      await this.prisma.alert.create({
        data: {
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

  async setAlertKey(
    alertId: number,
    dto: SetAlertKeyDto,
  ) {
    const alert =
      await this.prisma.alert.findUnique({
        where: {
          id: alertId,
        },
      });
    /*if (!alert || alert.userId !== userId)
      throw new ForbiddenException(
        'No eres el propietario de la Alerta',
      );*/
    return this.prisma.alert.update({
      where: {
        id: alertId,
      },
      data: {
        ...dto,
      },
    });
  }

  async editAlertByKey(
    alertKey: string,
    dto: UpdateAlertDto,
  ) {
    const alert =
      await this.prisma.alert.findUnique({
        where: {
          alertKey: alertKey,
        },
      });

    return this.prisma.alert.update({
      where: {
        alertKey: alertKey,
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
      await this.prisma.alert.findUnique({
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
        alertKey: alertKey,
      },
    });
  }
}

