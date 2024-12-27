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
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../Dtos/Courses_Dtos/category.dto';

@Controller('courses_categories')
export class CategoryController {
  constructor(
    @Inject('courses_service')
    private readonly coursesServiceClient: ClientProxy,
  ) {}
  @Get('health')
  async healthCheck() {
    return this.coursesServiceClient.send({ cmd: 'category_health_check' }, {});
  }

  @Get()
  async getAllCategories() {
    return this.coursesServiceClient.send({ cmd: 'get_all_categories' }, {});
  }

  @Get(':id')
  async getOneCategory(@Param('id') id: number) {
    return this.coursesServiceClient.send({ cmd: 'get_one_category' }, id);
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.coursesServiceClient.send(
      { cmd: 'create_category' },
      createCategoryDto,
    );
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.coursesServiceClient.send(
      { cmd: 'update_category' },
      { id, updateData: updateCategoryDto },
    );
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return this.coursesServiceClient.send({ cmd: 'delete_category' }, id);
  }
}
