import { Module } from '@nestjs/common';
import { AlertCategoryController } from './alertCategory.controller';
import { AlertCategoryService } from './alertCategory.service';

@Module({
  controllers: [AlertCategoryController],
  providers: [AlertCategoryService],
})
export class AlertCategoryModule {}
