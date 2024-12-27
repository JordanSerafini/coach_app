import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { CreateCourseDto, UpdateCourseDto } from 'src/Dtos/courses.dto';

@Injectable()
export class CoursesService {
  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  async getAllCourses() {
    try {
      const result = await this.pool.query('SELECT * FROM courses');
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching all courses',
        error,
      );
    }
  }

  async getOneCourse(id: number) {
    try {
      const result = await this.pool.query(
        'SELECT * FROM courses WHERE id = $1',
        [id],
      );
      if (result.rows.length === 0) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Error fetching course with ID ${id}`,
      );
    }
  }

  async createCourse(data: CreateCourseDto) {
    const {
      coach_id,
      category_id,
      title,
      description,
      max_participants,
      price,
      start_time,
      end_time,
    } = data;

    try {
      const query = `
        INSERT INTO courses 
          (coach_id, category_id, title, description, max_participants, price, start_time, end_time) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *;
      `;
      const result = await this.pool.query(query, [
        coach_id,
        category_id,
        title,
        description,
        max_participants,
        price,
        start_time,
        end_time,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Error creating course', error);
    }
  }

  async updateCourse(data: UpdateCourseDto) {
    const {
      id,
      coach_id,
      category_id,
      title,
      description,
      max_participants,
      price,
      start_time,
      end_time,
    } = data;

    try {
      const query = `
        UPDATE courses
        SET 
          coach_id = COALESCE($2, coach_id),
          category_id = COALESCE($3, category_id),
          title = COALESCE($4, title),
          description = COALESCE($5, description),
          max_participants = COALESCE($6, max_participants),
          price = COALESCE($7, price),
          start_time = COALESCE($8, start_time),
          end_time = COALESCE($9, end_time)
        WHERE id = $1
        RETURNING *;
      `;
      const result = await this.pool.query(query, [
        id,
        coach_id,
        category_id,
        title,
        description,
        max_participants,
        price,
        start_time,
        end_time,
      ]);
      if (result.rows.length === 0) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating course');
    }
  }

  async deleteCourse(id: number) {
    try {
      const result = await this.pool.query(
        'DELETE FROM courses WHERE id = $1 RETURNING *',
        [id],
      );
      if (result.rows.length === 0) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      return { message: `Course with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting course');
    }
  }
}
