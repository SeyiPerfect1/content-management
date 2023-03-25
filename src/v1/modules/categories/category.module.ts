import { Module } from '@nestjs/common';
import { CategoriesController } from './category.controller';
import { categoriesService } from './category.services';

@Module({
  controllers: [CategoriesController],
  providers: [categoriesService],
})
export class CategoriesModule {}