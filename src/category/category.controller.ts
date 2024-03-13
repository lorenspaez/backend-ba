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
import { EditCategoryDto } from './dto';
import { CreateCategoryDto } from './dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoryService.getCategoryById(categoryId);
  }

  @Get(':name')
  getCategoryByName(@Param('name') name: string) {
    return this.categoryService.getCategoryByName(name);
  }

  @Patch(':id')
  editCategory(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() dto: EditCategoryDto,
  ) {
    return this.categoryService.editCategoryById(categoryId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCategoryById(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoryService.deleteCategoryById(categoryId);
  }
}
