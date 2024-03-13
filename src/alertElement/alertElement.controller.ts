import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { EditAlertElementDto } from './dto';
import { CreateAlertElementDto } from './dto';
import { AlertElementService } from './alertElement.service';

@Controller('alertElements')
export class AlertElementController {
  constructor(private alertElementService: AlertElementService) {}

  @Post()
  createAlertElement(@Body() dto: CreateAlertElementDto) {
    return this.alertElementService.createElement(dto);
  }

  @Get()
  getAllAlertElements() {
    return this.alertElementService.getAllElements();
  }

  @Get(':id')
  getAlertElementById(@Param('id', ParseIntPipe) elementId: number) {
    return this.alertElementService.getElementById(elementId);
  }

  @Patch(':id')
  editAlertElement(
    @Param('id', ParseIntPipe) elementId: number,
    @Body() dto: EditAlertElementDto,
  ) {
    return this.alertElementService.editElementById(elementId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAlertElementById(@Param('id', ParseIntPipe) elementId: number) {
    return this.alertElementService.deleteElementById(elementId);
  }
}
