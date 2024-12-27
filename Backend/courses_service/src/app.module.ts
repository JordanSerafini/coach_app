import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { AttachmentModule } from './attachment/attachment.module';
import { PgConnectionModule } from 'pool_package';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoursesModule,
    CategoryModule,
    AttachmentModule,
    PgConnectionModule,
  ],
})
export class AppModule {}
