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

    //const numMembersIds = JSON.parse(dto.membersIds);

    const numMembersIds = dto.membersId.map(Number);
    delete dto.membersId;

    const organization =
      await this.prisma.organization.create({
        data: {
          createdBy: createdBy,
          ...dto,
        },
      });

    const userr =
      await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          organizationId: organization.id,
          organizationName: organization.name
          }
      });

    for(var i = 0; i<numMembersIds.length ; i++) { 
      await this.prisma.user.update({
        where: {
          id: numMembersIds[i]
        },
        data: {
          organizationId: organization.id,
          organizationName: organization.name
          }
      });
    };
    return {userr, organization};
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
