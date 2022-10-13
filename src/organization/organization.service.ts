import { Injectable , ForbiddenException } from '@nestjs/common';
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
    
    const org1 = await this.prisma.organization.findUnique({
      where:{
        name: dto.name
      },
    });

    if (org1 != null){
      throw new ForbiddenException(
        'Este nombre ya está siendo utilizado'
      )
    };

    const user = await this.prisma.user.findUnique({
      where:{
        id: userId
      },
    });

    if(user.organizationId != null){
      throw new ForbiddenException(
        'Ya perteneces a una organización',
      );
    };

    const numMembersIds = JSON.parse(dto.membersId);
    delete dto.membersId;

    const org =
      await this.prisma.organization.create({
        data: {
          createdBy: createdBy,
          ...dto,
        },
      });

    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        organizationId: org.id,
        organizationName: org.name
        }
    });

    for(var i = 0; i<numMembersIds.length ; i++) { 

      await this.prisma.user.findUnique({
        where:{
          id: numMembersIds[i]
        },
      });

      if (user.isVolunteer == true){

        await this.prisma.user.update({
          where: {
            id: numMembersIds[i]
          },
          data: {
            organizationId: org.id,
            organizationName: org.name
            }
        });
      }
    };

    const users = await this.prisma.user.findMany({
      where:{
        organizationId: org.id
      },
    });

    return {org, users};
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
        organizationName: null,
        isVolunteer: true,
      },
    });
  }

  async getOrganizationById(
    organizationId: number,
  ) {
    const org = await this.prisma.organization.findFirst({
      where: {
        id: organizationId,
      },
    });

    const users = await this.prisma.user.findMany({
      where:{
        organizationId: organizationId
      }
    });

    return {org, users}
  }

  async getOrganizationByName(
    organizationName: string,
  ) {
    const org = await this.prisma.organization.findFirst({
      where: {
        name: organizationName,
      },
    });

    const users = await this.prisma.user.findMany({
      where:{
        organizationName: organizationName
      }
    });

    return {org, users}
  }

  async editOrganizationById(
    userId: number,
    organizationId: number,
    dto: EditOrganizationDto,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if(user.organizationId != organizationId){
      throw new ForbiddenException(
        'No perteneces a esta fundación'
      )
    };

    const org1 = await this.prisma.organization.findUnique({
      where:{
        name: dto.name
      },
    });

    if(org1 != null){
      throw new ForbiddenException(
        'Este nombre ya está siendo utilizado'
      )
    };

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

    const org = await this.prisma.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        isFoundation: true,
        ...dto
      },
    });

    const users = await this.prisma.user.findMany({
      where:{
        organizationId: org.id,
      },
    });
    
    return {org, users}
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
        },
      });

    const organization =
      await this.prisma.organization.findUnique({
        where: {
          id: organizationId,
        },
      });

    if (user.organizationName !== organization.name){
      throw new ForbiddenException(
        'No perteneces a esta fundación',
      );
    };

    await this.prisma.user.updateMany({
      where:{
        organizationId: organizationId
      },
      data:{
        organizationId: null,
        organizationName: null,
      }
    });

    return await this.prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });
  }
}
