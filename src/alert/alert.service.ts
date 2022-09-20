import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { TakeAlertDto } from './dto/take-alert.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) {}

  async createAlert(
    userId: number,
    userName: string,
    alertCategoryName: string,
    dto: CreateAlertDto,
  ) {
    const alertCategory = await this.prisma.alertCategory.findFirst({
      where:{
        name: alertCategoryName
      }
    });

    if (userId == null){
      const alert = await this.prisma.alert.create({
        data: {
          userName: userName,
          alertCategoryName: alertCategoryName,
          alertCategoryId: alertCategory.id,
          ...dto,
        },
      });

    return alert;
    };

    const alert = await this.prisma.alert.create({
        data: {
          userId: userId,
          alertCategoryId: alertCategory.id,
          alertCategoryName: alertCategoryName,
          userName: userName,
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

  getAlertByKey(
    alertKey: string,
  ) {
    return this.prisma.alert.findFirst({
      where: {
        alertKey: alertKey
      },
    });
  }

  async setAlertKey(
    alertId: number,
    userName: string,
    userId: number
  ) {
    if (userId != null){
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          alertKey: String(alertId)+userName
        },
      });

      return await this.prisma.alert.update({
        where: {
          id: alertId,
        },
        data: {
          alertKey: String(alertId)+userName
        },
      });
    }

    return await this.prisma.alert.update({
      where: {
        id: alertId,
      },
      data: {
        alertKey: String(alertId)+userName
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

  async takeAlert(
    alertId: number,
    volunteerId: number,
    dto: TakeAlertDto
  ){
    const volunteer =
      await this.prisma.user.findUnique({
        where: {
          id: volunteerId
        }
      })

    if (volunteer.isVolunteer == false){
      throw new ForbiddenException(
        'Solo los voluntarios pueden tomar casos',
  );
    }
    const alert = await this.prisma.alert.findUnique({
        where: {
          id: alertId
        }
      })

    if (alert.status == "Tomado"){
      throw new ForbiddenException(
        'El caso ya está siendo atendido por otro Voluntario',
      );
    }

    return await this.prisma.alert.update({
      where: {
        id: alertId
      },
      data: {
        volunteerId: volunteer.id,
        volunteerName: volunteer.name,
        status: "Tomado",
        ...dto
      }
    });
  }

  async cloneAlert(
    alertId: number,
    volunteerId: number,
    dto: CreateAlertDto){
      const alert = 
        await this.prisma.alert.findUnique({
          where:{
            id: alertId
          }
        });

      const user =
        await this.prisma.user.findUnique({
          where:{
            id: volunteerId
          }
        });

      const newAlert =
        await this.prisma.alert.create({
          data:{
            userName: user.name,
            userId: user.id,
            userPhone: alert.volunteerPhone,
            parentId: alert.id,
            ...dto
        }
      });

      await this.prisma.user.update({
        where:{
          id:volunteerId
        },
        data:{
          alertKey: String(newAlert.id)+user.name
        }
      });

      await this.prisma.alert.update({
        where:{
          id:alertId
        },
        data:{
          childId: newAlert.id
        }
      });

      return await this.prisma.alert.update({
        where:{
          id: newAlert.id
        },
        data:{
          alertKey: String(newAlert.id)+user.name
        }
      });
    }

  async closeAlert(
    alertId: number,
    volunteerId: number
  ){
    const volunteer =
      await this.prisma.user.findUnique({
        where: {
          id: volunteerId
        }
      })

    if (volunteer.isVolunteer == false){
      throw new ForbiddenException(
        'Solo los voluntarios pueden cerrar casos',
      );
    }

    const alert =
      await this.prisma.alert.findUnique({
        where: {
          id: alertId
        }
      })

    if (volunteer.id != alert.volunteerId){
      throw new ForbiddenException(
        'Otro voluntario esta a cargo de esta alerta',
      );
    }

    const user = await this.prisma.user.findFirst({
      where:{
        alertKey: alert.alertKey,
      }
    });

    await this.prisma.user.update({
      where:{
        id: user.id,
      },
      data:{
        alertKey: null,
      }
    });

    return await this.prisma.alert.update({
      where: {
        id: alertId
      },
      data: {
        status: "Cerrado"
      }
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
      
    const user = 
      await this.prisma.user.findFirst({
        where:{
          alertKey: alert.alertKey
        },
      });

    await this.prisma.user.update({
      where:{
        id: user.id
      },
      data:{
        alertKey: null
      }
    });

    return await this.prisma.alert.delete({
      where: {
        id: alert.id,
      },
    });
  }
}
