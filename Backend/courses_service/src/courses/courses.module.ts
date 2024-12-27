import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { PgConnectionModule } from 'pool_package';
import { CoursesService } from './courses.service';
@Module({
  imports: [PgConnectionModule],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
