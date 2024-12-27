import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../Dtos/category.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'category_health_check' })
  healthCheck() {
    return { status: 200 };
  }

  @MessagePattern({ cmd: 'get_all_categories' })
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @MessagePattern({ cmd: 'get_one_category' })
  async getOneCategory(@Payload() id: number) {
    return await this.categoryService.getOneCategory(id);
  }

  @MessagePattern({ cmd: 'create_category' })
  async createCategory(@Payload() data: CreateCategoryDto) {
    return await this.categoryService.createCategory(data);
  }

  @MessagePattern({ cmd: 'update_category' })
  async updateCategory(
    @Payload() data: { id: number; updateData: UpdateCategoryDto },
  ) {
    return await this.categoryService.updateCategory(data.id, data.updateData);
  }

  @MessagePattern({ cmd: 'delete_category' })
  async deleteCategory(@Payload() id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}
