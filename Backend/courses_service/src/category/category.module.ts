import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PgConnectionModule } from 'pool_package';

@Module({
  imports: [PgConnectionModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
