import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto, SetUserKeyDto } from './dto';
import { UpgradeUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      where: {
      },
    });
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
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: true
      },
    });
    delete user.hash;
    return user;
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
}
