import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Pool } from 'pg';
import {
  CreateCourseAttachmentDto,
  UpdateCourseAttachmentDto,
} from '../Dtos/attachment.dto';

@Injectable()
export class AttachmentService {
  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  async getAllAttachments() {
    try {
      const result = await this.pool.query('SELECT * FROM course_attachments');
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching all attachments',
        error,
      );
    }
  }

  async getOneAttachment(id: number) {
    try {
      const result = await this.pool.query(
        'SELECT * FROM course_attachments WHERE id = $1',
        [id],
      );
      if (result.rows.length === 0) {
        throw new NotFoundException(`Attachment with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Error fetching attachment with ID ${id}`,
      );
    }
  }

  async createAttachment(data: CreateCourseAttachmentDto) {
    const { course_id, file_url } = data;

    try {
      const query = `
        INSERT INTO course_attachments 
          (course_id, file_url) 
        VALUES 
          ($1, $2) 
        RETURNING *;
      `;
      const result = await this.pool.query(query, [course_id, file_url]);
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating attachment',
        error,
      );
    }
  }

  async updateAttachment(id: number, data: UpdateCourseAttachmentDto) {
    const { course_id, file_url, uploaded_at } = data;

    try {
      const query = `
        UPDATE course_attachments
        SET 
          course_id = COALESCE($2, course_id),
          file_url = COALESCE($3, file_url),
          uploaded_at = COALESCE($4, uploaded_at)
        WHERE id = $1
        RETURNING *;
      `;
      const result = await this.pool.query(query, [
        id,
        course_id,
        file_url,
        uploaded_at,
      ]);
      if (result.rows.length === 0) {
        throw new NotFoundException(`Attachment with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating attachment');
    }
  }

  async deleteAttachment(id: number) {
    try {
      const result = await this.pool.query(
        'DELETE FROM course_attachments WHERE id = $1 RETURNING *',
        [id],
      );
      if (result.rows.length === 0) {
        throw new NotFoundException(`Attachment with ID ${id} not found`);
      }
      return { message: `Attachment with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting attachment');
    }
  }
}
