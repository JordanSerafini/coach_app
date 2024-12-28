import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateCourseDto,
  UpdateCourseDto,
} from '../../Dtos/Courses_Dtos/courses.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('courses_service')
    private readonly coursesServiceClient: ClientProxy,
  ) {}

  @Get('health')
  async healthCheck() {
    return this.coursesServiceClient.send({ cmd: 'health_courses' }, {});
  }

  @Get()
  async getAllCourses() {
    return this.coursesServiceClient.send({ cmd: 'get-all' }, {});
  }

  @Get(':id')
  async getOneCourse(@Param('id') id: number) {
    return this.coursesServiceClient.send({ cmd: 'get-one' }, id);
  }

  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesServiceClient.send({ cmd: 'create' }, createCourseDto);
  }

  @Put(':id')
  async updateCourse(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesServiceClient.send(
      { cmd: 'update' },
      { id, updateData: updateCourseDto },
    );
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: number) {
    return this.coursesServiceClient.send({ cmd: 'delete' }, id);
  }
}
