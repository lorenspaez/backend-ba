import { Injectable , ForbiddenException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditOrganizationDto } from './dto';
import { UpgradeOrganizationDto } from './dto';
import { CreateOrganizationDto, FilterOrganizationUserDto} from './dto';

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

    return {user, organization};
  }

  getAllOrganizations() {
    return this.prisma.organization.findMany({
      where: {
      },
    });
  }

  async search({
    name
  }: FilterOrganizationUserDto): Promise<User[]> {
    //if (active == null) throw new BadRequestException(ACTIVATE_MISSING);
    const users: User[] = await this.prisma.user.findMany({
      where: {
        name: {
          contains: `%${name}%`
        },
      },
    });
    return users;
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

  async getUsersFromOrg(
    organizationId: number
  ){
    const users = 
      await this.prisma.user.findMany({
        where:{
          organizationId: organizationId
        }
      });

    return users;
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
