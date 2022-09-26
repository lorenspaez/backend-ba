import { Injectable , ForbiddenException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditOrganizationDto } from './dto';
import { UpgradeOrganizationDto } from './dto';
import { CreateOrganizationDto} from './dto';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(
    userId: number,
    createdBy: string,
    dto: CreateOrganizationDto,
  ) {

    const numMembersIds = dto.membersId.map(Number);
    delete dto.membersId;

    const organization =
      await this.prisma.organization.create({
        data: {
          createdBy: createdBy,
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

    //Adding new members to organization
    //const membersIds = dto.membersId;

    for(var i = 0; i<numMembersIds.length ; i++) { 
      this.prisma.user.update({
        where: {
          id: numMembersIds[i]
        },
        data: {
          organizationId: organization.id,
          organizationName: organization.name
          }
      });
    };

    return {user, organization};
  }

  getAllOrganizations() {
    return this.prisma.organization.findMany({
      where: {
      },
    });
  }

  async searchUsers(
    name: string){
    return await this.prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
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
    userId: number,
    dto: UpgradeOrganizationDto
  ) {
    const user = await this.prisma.user.findUnique({
      where:{
        id: userId
      }
    });

    if (user.organizationId != organizationId){
      throw new ForbiddenException(
        'No perteneces a esta fundación'
      )
    };

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
