import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { AlertService } from './alert.service';
import { CreateAlertDto, SetAlertKeyDto } from './dto';
import { UpdateAlertDto } from './dto';

@UseGuards(JwtGuard)
@Controller('alerts')
export class AlertController {
  constructor(private alertService: AlertService) {}

  @Post()
  createAlert(
    @GetUser('id') userId: number,
    @GetUser('name') userName: string,
    @Body() dto: CreateAlertDto,
  ) {
    return this.alertService.createAlert(userId, userName, dto);
  }

  @Get()
  getAllAlerts() {
    return this.alertService.getAllAlerts();
  }

  @Get('myalerts')
  getMyAlerts(@GetUser('id') userId: number) {
    return this.alertService.getMyAlerts(userId);
  }

  @Get(':id')
  getAlertById(
    @Param('id', ParseIntPipe) alertId: number,
  ) {
    return this.alertService.getAlertById(alertId);
  }

  @Patch('key/:id')
  setAlertKey(
    @Param('id', ParseIntPipe) alertId: number,
    @GetUser('name') userName: string,
    @GetUser('id') userId: number,
    @Body() dto: SetAlertKeyDto,
  ) {
    return this.alertService.setAlertKey(alertId, userName, dto);
  }

  @Patch(':alertKey')
  editAlertByKey(
    @Param('alertKey') alertKey: string,
    @Body() dto: UpdateAlertDto,
  ) {
    return this.alertService.editAlertByKey(alertKey, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':alertKey')
  deleteAlertByKey(
    @Param('alertKey') alertKey: string,
  ) {
    return this.alertService.deleteAlertByKey(alertKey);
  }
}
