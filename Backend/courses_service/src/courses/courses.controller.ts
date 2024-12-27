import { Controller } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCourseDto, UpdateCourseDto } from 'src/Dtos/courses.dto';

@Controller('')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern({ cmd: 'health_routes' })
  healthCheck() {
    return { status: 'ok' };
  }

  @MessagePattern({ cmd: 'get-all' })
  async getAllCourses() {
    return await this.coursesService.getAllCourses();
  }

  @MessagePattern({ cmd: 'get-one' })
  async getOneCourse(@Payload() id: number) {
    return await this.coursesService.getOneCourse(id);
  }

  @MessagePattern({ cmd: 'create' })
  async createCourse(@Payload() data: CreateCourseDto) {
    return await this.coursesService.createCourse(data);
  }

  @MessagePattern({ cmd: 'update' })
  async updateCourse(@Payload() data: UpdateCourseDto) {
    return await this.coursesService.updateCourse(data);
  }

  @MessagePattern({ cmd: 'delete' })
  async deleteCourse(@Payload() id: number) {
    return await this.coursesService.deleteCourse(id);
  }
}
