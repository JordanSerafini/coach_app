import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { CreateCategoryDto, UpdateCategoryDto } from '../Dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  async getAllCategories() {
    try {
      const result = await this.pool.query('SELECT * FROM course_categories');
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching all categories',
        error,
      );
    }
  }

  async getOneCategory(id: number) {
    try {
      const result = await this.pool.query(
        'SELECT * FROM course_categories WHERE id = $1',
        [id],
      );
      if (result.rows.length === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Error fetching category with ID ${id}`,
      );
    }
  }

  async createCategory(data: CreateCategoryDto) {
    const { name, description } = data;

    try {
      const query = `
        INSERT INTO course_categories 
          (name, description) 
        VALUES 
          ($1, $2) 
        RETURNING *;
      `;
      const result = await this.pool.query(query, [name, description]);
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Error creating category', error);
    }
  }

  async updateCategory(id: number, data: UpdateCategoryDto) {
    const { name, description } = data;

    try {
      const query = `
        UPDATE course_categories
        SET 
          name = COALESCE($2, name),
          description = COALESCE($3, description)
        WHERE id = $1
        RETURNING *;
      `;
      const result = await this.pool.query(query, [id, name, description]);
      if (result.rows.length === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating category');
    }
  }

  async deleteCategory(id: number) {
    try {
      const result = await this.pool.query(
        'DELETE FROM course_categories WHERE id = $1 RETURNING *',
        [id],
      );
      if (result.rows.length === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return { message: `Category with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting category');
    }
  }
}
