import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto';
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
    return this.alertService.createAlert(userName, dto);
  }

  @Get()
  getAllAlerts() {
    return this.alertService.getAllAlerts();
  }

  @Get('myalerts')
  getAlerts(@GetUser('id') userId: number) {
    return this.alertService.getAlerts(userId);
  }

  @Get(':id')
  getAlertById(
    @Param('id', ParseIntPipe) alertId: number,
  ) {
    return this.alertService.getAlertById(alertId);
  }

  @Patch(':id')
  editAlertById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) alertId: number,
    @Body() dto: UpdateAlertDto,
  ) {
    return this.alertService.editAlertById(userId, alertId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAlertById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) alertId: number,
  ) {
    return this.alertService.deleteAlertById(userId, alertId);
  }
}
