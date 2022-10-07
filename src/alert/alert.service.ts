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
      },
    });

    //If it is an unregistered user
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
      },
    });

    return await this.prisma.alert.update({
      where:{
        id: alert.id
      },
      data:{
        alertKey: String(alert.id)+alert.userName
      },
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

  async getAlertById(
    alertId: number,
  ) {
    const alert = await this.prisma.alert.findFirst({
      where: {
        id: alertId
      },
    });

    if(alert.id == null){
      throw new ForbiddenException(
        'No existe la alerta',
      )
    };

    return alert;
  }

  async getAlertByKey(
    alertKey: string,
  ) {
    const alert = await this.prisma.alert.findFirst({
      where: {
        alertKey: alertKey
      },
    });

    if(alert.id == null){
      throw new ForbiddenException(
        'No existe la alerta',
      )
    };

    const user = await this.prisma.user.findFirst({
      where:{
        alertKey: alertKey,
      },
    });

    const volunteer = await this.prisma.user.findFirst({
      where:{
        takenAlertId: alertKey
      },
    });

    return {alert, user, volunteer};
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

    if(alert.id == null){
      throw new ForbiddenException(
        'No existe la alerta',
      )
    };

    return await this.prisma.alert.update({
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
        },
      });

    if (volunteer.isVolunteer == false){
      throw new ForbiddenException(
        'Solo los voluntarios pueden tomar casos',
      )
    };

    const alert = await this.prisma.alert.findUnique({
        where: {
          id: alertId
        },
      });

    if(alert.id == null){
      throw new ForbiddenException(
        'No existe la alerta',
      )
    };

    if (alert.status == "Tomado"){
      throw new ForbiddenException(
        'El caso ya está siendo atendido',
      );
    }

    await this.prisma.user.update({
      where:{
        id:volunteerId
      },
      data:{
        takenAlertId: String(alert.id)+alert.userName
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
      },
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
          },
        });

      const user =
        await this.prisma.user.findUnique({
          where:{
            id: volunteerId
          },
        });

      const newAlert =
        await this.prisma.alert.create({
          data:{
            userName: user.name,
            userId: user.id,
            userPhone: alert.volunteerPhone,
            parentId: alert.id,
            ...dto
          },
        });

      await this.prisma.user.update({
        where:{
          id:volunteerId
        },
        data:{
          alertKey: String(newAlert.id)+user.name
        },
      });

      await this.prisma.alert.update({
        where:{
          id:alertId
        },
        data:{
          childId: newAlert.id
        },
      });

      return await this.prisma.alert.update({
        where:{
          id: newAlert.id
        },
        data:{
          alertKey: String(newAlert.id)+user.name
        },
      });
    }

  async leaveAlert(
    volunteerId: number
  ){
    await this.prisma.user.update({
      where:{
        id: volunteerId
      },
      data:{
        takenAlertId: null
      },
    });

    const alert = await this.prisma.alert.findFirst({
      where:{
        volunteerId: volunteerId
      },
    });

    return await this.prisma.alert.update({
      where:{
        id: alert.id
      },
      data:{
        volunteerId: null,
        volunteerName: null,
        volunteerPhone: null,
        arrivalTime: null,
        providedElementName: null
      },
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
        },
      });

    if (volunteer.isVolunteer == false){
      throw new ForbiddenException(
        'Solo los voluntarios pueden cerrar casos',
      );
    }

    const alert =
      await this.prisma.alert.findUnique({
        where: {
          id: alertId
        },
      });

    if (volunteer.id != alert.volunteerId){
      throw new ForbiddenException(
        'Otro voluntario esta a cargo de esta alerta',
      );
    }

    if(alert.userId  == null){
      await this.prisma.user.update({
        where:{
          id: volunteerId
        },
        data:{
          takenAlertId: null
        },
      });
  
      return await this.prisma.alert.update({
        where: {
          id: alertId
        },
        data: {
          status: "Cerrado"
        },
      });
    }

    await this.prisma.user.update({
      where:{
        id: alert.userId,
      },
      data:{
        alertKey: null,
      },
    });

    await this.prisma.user.update({
      where:{
        id: volunteerId
      },
      data:{
        takenAlertId: null
      },
    });

    return await this.prisma.alert.update({
      where: {
        id: alertId
      },
      data: {
        status: "Cerrado"
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
      //If there is not volunteer and user is a Guest
      if(alert.volunteerId == null){
        if(alert.userId == null){
          return await this.prisma.alert.delete({
            where: {
              id: alert.id,
            },
          });
        }
        //If there is no volunteer and user is registered
        await this.prisma.user.update({
          where:{
            id: alert.userId
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
      //If there is a volunteer but user is a Guest
      if(alert.userId == null){
        await this.prisma.user.update({
          where:{
            id: alert.volunteerId
          },
          data:{
            takenAlertId: null
          }
        });

        return await this.prisma.alert.delete({
          where: {
            id: alert.id,
          },
        });
      }
    //if there is a volunteer and the user is registered
    await this.prisma.user.update({
      where:{
        id: alert.volunteerId
      },
      data:{
        takenAlertId: null
      }
    });

    await this.prisma.user.update({
      where:{
        id: alert.userId
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
