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

  async upgradeUser(
    userId: number,
    dto: UpgradeUserDto,
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

  async setUserKey(
    userId: number,
    dto: SetUserKeyDto,
  ) {
    const alert =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteUserById(
    userId: number
  ) {
    const alert =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
