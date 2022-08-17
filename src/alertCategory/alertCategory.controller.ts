import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { EditAlertCategoryDto } from './dto';
import { CreateAlertCategoryDto } from './dto';
import { AlertCategoryService } from './alertCategory.service';

@UseGuards(JwtGuard)
@Controller('alertCategories')
export class AlertCategoryController {
  constructor(private alertCategoryService: AlertCategoryService) {}

  @Post()
  createAlertCategory(
    @Body() dto: CreateAlertCategoryDto,
  ) {
    return this.alertCategoryService.createCategory(dto);
  }

  @Get()
  getAllAlertCategories() {
    return this.alertCategoryService.getAllCategories();
  }

  @Get(':id')
  getAlertCategoryById(
    @Param('id', ParseIntPipe) categoryId: number,
    ) {
    return this.alertCategoryService.getCategoryById(categoryId);
  }

  @Patch(':id')
  editAlertCategory(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() dto: EditAlertCategoryDto,
  ) {
    return this.alertCategoryService.editCategoryById(categoryId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAlertCategoryById(
    @Param('id', ParseIntPipe) categoryId: number,
  ) {
    return this.alertCategoryService.deleteCategoryById(categoryId);
  }
}
