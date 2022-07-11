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

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.alertService.getAlerts(
      userId,
    );
  }

  @Post()
  createAlert(
    @GetUser('id') userId: number,
    @Body() dto: CreateAlertDto,
  ) {
    return this.alertService.createAlert(
      userId,
      dto,
    );
  }

  @Get()
  getAlerts(@GetUser('id') userId: number) {
    return this.alertService.getAlerts(
      userId,
    );
  }

  @Get(':id')
  getAlertById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) alertId: number,
  ) {
    return this.alertService.getAlertById(
      userId,
      alertId,
    );
  }

  @Patch(':id')
  editAlertById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) alertId: number,
    @Body() dto: UpdateAlertDto,
  ) {
    return this.alertService.editAlertById(
      userId,
      alertId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) alertId: number,
  ) {
    return this.alertService.deleteAlertById(
      userId,
      alertId,
    );
  }
}
