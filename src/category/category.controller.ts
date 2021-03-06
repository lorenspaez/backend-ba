import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { EditCategoryDto } from './dto';
import { CreateCategoryDto } from './dto';
import { CategoryService } from './category.service';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(
    @Body() dto: CreateCategoryDto,
  ) {
    return this.categoryService.createCategory(
      dto
    );
  }

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(
    @Param('id', ParseIntPipe) categoryId: number,
    ) {
    return this.categoryService.getCategoryById(
      categoryId
    );
  }

  @Patch(':id')
  editCategory(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() dto: EditCategoryDto,
  ) {
    return this.categoryService.editCategoryById(
      categoryId,
      dto,
      );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCategoryById(
    @Param('id', ParseIntPipe) categoryId: number,
  ) {
    return this.categoryService.deleteCategoryById(
      categoryId,
    );
  }
}
