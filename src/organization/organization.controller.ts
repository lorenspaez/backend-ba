import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditOrganizationDto } from './dto';
import { UpgradeOrganizationDto } from './dto';
import { CreateOrganizationDto} from './dto';
import { OrganizationService } from './organization.service';

@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @UseGuards(JwtGuard)
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

  @UseGuards(JwtGuard)
  @Patch('edit/:id')
  editOrganization(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) organizationId: number,
    @Body() dto: EditOrganizationDto,
  ) {
    return this.organizationService.editOrganizationById(userId, organizationId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('upgrade/:id')
  upgradeOrganization(
    @Param('id', ParseIntPipe) organizationId: number,
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() dto: UpgradeOrganizationDto,
  ) {
    return this.organizationService.upgradeOrganizationById(organizationId, userId, dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOrganizationById(
    @Param('id', ParseIntPipe) organizationId: number,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    return this.organizationService.deleteOrganizationById(organizationId, userId);
  }
}
