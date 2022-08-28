import { Injectable , ForbiddenException } from '@nestjs/common';
import { runInThisContext } from 'vm';
import { PrismaService } from '../prisma/prisma.service';
import { EditOrganizationDto } from './dto';
import { UpgradeOrganizationDto } from './dto';
import { CreateOrganizationDto } from './dto';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(
    userId: number,
    dto: CreateOrganizationDto,
  ) {

    const organization =
      await this.prisma.organization.create({
        data: {
          ...dto,
        },
      });

    const user =
      await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          organizationId: organization.id,
          organizationName: organization.name
          }
      });

    return organization;
  }

  getAllOrganizations() {
    return this.prisma.organization.findMany({
      where: {
      },
    });
  }

  getOrganizationById(
    organizationId: number,
  ) {
    return this.prisma.organization.findFirst({
      where: {
        id: organizationId,
      },
    });
  }

  getOrganizationByName(
    organizationName: string,
  ) {
    return this.prisma.organization.findFirst({
      where: {
        name: organizationName,
      },
    });
  }

  async editOrganizationById(
    organizationId: number,
    dto: EditOrganizationDto,
  ) {
    const organization = await this.prisma.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        ...dto,
      },
    });
    return organization;
  }

  async upgradeOrganizationById(
    organizationId: number,
    dto: UpgradeOrganizationDto,
  ) {
    const organization = await this.prisma.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        isFoundation: true,
        ...dto
      },
    });
    return organization;
  }

  async deleteOrganizationById(
    organizationId: number,
    userId: number
  ) {
    const user =
      await this.prisma.user.findUnique({
        where:{
          id: userId
        }
      })

    const organization =
      await this.prisma.organization.findUnique({
        where: {
          id: organizationId,
        },
      });

    if (user.organizationName !== organization.name)
      throw new ForbiddenException(
        'No perteneces a esta fundación',
      );

    await this.prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });
  }
}
