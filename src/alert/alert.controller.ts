import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { AlertService } from './alert.service';
import { CreateAlertDto, TakeAlertDto, UpdateAlertDto} from './dto';

@Controller('alerts')
export class AlertController {
  constructor(private alertService: AlertService) {}

  @Post()
  createAlert(
    @Body() dto: CreateAlertDto,
  ) {
    return this.alertService.createAlert(dto);
  }

  @Get()
  getAllAlerts() {
    return this.alertService.getAllAlerts();
  }

  @UseGuards(JwtGuard)
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

  @Get('key/:alertKey')
  getAlertByKey(
    @Param('alertKey') alertKey: string,
  ) {
    return this.alertService.getAlertByKey(alertKey);
  }

  @Patch('key/:alertKey')
  editAlertByKey(
    @Param('alertKey') alertKey: string,
    @Body() dto: UpdateAlertDto,
  ) {
    return this.alertService.editAlertByKey(alertKey, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('takeAlert/:id')
  takeAlert(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') volunteerId: number,
    @Body() dto: TakeAlertDto
  ){
    return this.alertService.takeAlert(id, volunteerId, dto)
  }

  @UseGuards(JwtGuard)
  @Patch('leaveAlert')
  leaveAlert(
    @GetUser('id') volunteerId: number,
  ){
    return this.alertService.leaveAlert(volunteerId);
  }

  @UseGuards(JwtGuard)
  @Post('cloneAlert/:id')
  askForHelp(
    @Param('id', ParseIntPipe) alertId: number,
    @GetUser('id') userId: number,
    @Body() dto: CreateAlertDto
  ){
    return this.alertService.cloneAlert(alertId, userId, dto)
  }

  @UseGuards(JwtGuard)
  @Patch('closeAlert/:id')
  closeAlert(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') volunteerId: number
  ){
    return this.alertService.closeAlert(id, volunteerId)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('key/:alertKey')
  deleteAlertByKey(
    @Param('alertKey') alertKey: string,
  ) {
    return this.alertService.deleteAlertByKey(alertKey);
  }
}
