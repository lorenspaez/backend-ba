import { Injectable , ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditOrganizationDto } from './dto';
import { UpgradeOrganizationDto } from './dto';
import { CreateOrganizationDto } from './dto';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(
    dto: CreateOrganizationDto,
  ) {
    const organization =
      await this.prisma.organization.create({
        data: {
          ...dto,
        },
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
    return this.prisma.alert.findFirst({
      where: {
        id: organizationId,
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
        ...dto
      },
    });
    return organization;
  }

  async deleteOrganizationById(
    organizationId: number
  ) {
    const organization =
      await this.prisma.organization.findUnique({
        where: {
          id: organizationId,
        },
      });

    // check if user owns the bookmark
    if (organizationId !== organizationId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });
  }
}
