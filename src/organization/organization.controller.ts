import { Controller, Query, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditOrganizationDto } from './dto';
import { UpgradeOrganizationDto } from './dto';
import { CreateOrganizationDto} from './dto';
import { OrganizationService } from './organization.service';

@UseGuards(JwtGuard)
@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  createOrganization(
    @GetUser('id', ParseIntPipe) userId: number,
    @GetUser('name') createdBy: string,
    @Body() dto: CreateOrganizationDto,
  ) {
    return this.organizationService.createOrganization(userId, createdBy, dto);
  }

  @Get()
  getAllOrganizations() {
    return this.organizationService.getAllOrganizations();
  }

  @Get('users/:id')
  getUsersFromOrg(
    @Param('id', ParseIntPipe) organizationId: number,
  ){
    return this.organizationService.getUsersFromOrg(organizationId);
  }

  @Get('search/:name')
  search(
    @Param('name') name: string,
  ){
    return this.organizationService.searchUsers(name);
  }


  @Get(':id')
  getOrganizationById(
    @Param('id', ParseIntPipe) organizationId: number,
    ) {
    return this.organizationService.getOrganizationById(organizationId);
  }

  @Patch('edit/:id')
  editOrganization(
    @Param('id', ParseIntPipe) organizationId: number,
    @Body() dto: EditOrganizationDto,
  ) {
    return this.organizationService.editOrganizationById(organizationId, dto);
  }

  @Patch('upgrade/:id')
  upgradeOrganization(
    @Param('id', ParseIntPipe) organizationId: number,
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() dto: UpgradeOrganizationDto,
  ) {
    return this.organizationService.upgradeOrganizationById(organizationId, userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOrganizationById(
    @Param('id', ParseIntPipe) organizationId: number,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    return this.organizationService.deleteOrganizationById(organizationId, userId);
  }
}
