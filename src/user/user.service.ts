import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { UpgradeUserDto } from './dto';
import { CreateTokenDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      where: {
      },
    });
  }

  async getVolunteers(){
    const volunteers = await this.prisma.user.findMany({
      where:{
        isVolunteer: true
      }
    });
    return volunteers;
  }

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }

  async activateMode(
    userId: number,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    delete user.hash;

    if (user.isActive == true){
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isActive: false
        },
      });
    }

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: true
      },
    });
  }


  async upgradeUser(
    userId: number,
    dto: UpgradeUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isVolunteer: true,
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }

  async deleteUserById(
    userId: number
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (user.id !== userId)
      throw new ForbiddenException(
        'Acceso denegado al usuario',
      );

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return "Usuario eliminado";
  }

  async setNotifications(
    dto: CreateTokenDto
  ){
    if(dto.userId == 0){
      const alert = await this.prisma.alert.findFirst({
        where:{
          alertKey: dto.alertKey,
        },
      });

      await this.prisma.alert.update({
        where:{
          id: alert.id
        },
        data:{
          notifAlertToken: dto.token,
        },
      });
      return 
    };

    await this.prisma.user.update({
      where:{
        id: dto.userId
      },
      data:{
        notifUserToken: dto.token,
      },
    });
    return 
  }
}
