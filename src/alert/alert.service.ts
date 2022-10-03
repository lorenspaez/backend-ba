import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { TakeAlertDto } from './dto/take-alert.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) {}

  async createAlert(
    dto: CreateAlertDto,
  ) {

    const alertCategory = await this.prisma.alertCategory.findFirst({
      where:{
        name: dto.alertCategoryName
      }
    });

    //If it is a unregistered user
    if (dto.userId == null){
      const alert1 = await this.prisma.alert.create({
        data: {
          alertCategoryName: alertCategory.name,
          alertCategoryId: alertCategory.id,
          ...dto,
        },
      });

      return await this.prisma.alert.update({
        where:{
          id: alert1.id
        },
        data:{
          alertKey: String(alert1.id)+alert1.userName
        },
      });
    };

    //If its a registered user
    const id_user = String(dto.userId)
    delete dto.userId;
    
    const alert = await this.prisma.alert.create({
        data: {
          userId: parseInt(id_user),
          alertCategoryId: alertCategory.id,
          alertCategoryName: alertCategory.name,
          ...dto,
        },
      });

    await this.prisma.user.update({
      where:{
        id: parseInt(id_user)
      },
      data:{
        alertKey: String(alert.id)+alert.userName
      }
    })

    return await this.prisma.alert.update({
      where:{
        id: alert.id
      },
      data:{
        alertKey: String(alert.id)+alert.userName
      }
    });
    
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

    await this.prisma.user.update({
      where:{
        id:volunteerId
      },
      data:{
        takenAlertId: alertId
      },
    });
    
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

    await this.prisma.user.update({
      where:{
        id: volunteerId
      },
      data:{
        takenAlertId: null
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
