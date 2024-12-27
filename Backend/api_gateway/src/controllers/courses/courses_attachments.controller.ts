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
  CreateCourseAttachmentDto,
  UpdateCourseAttachmentDto,
} from '../../Dtos/Courses_Dtos/attachment.dto';

@Controller('courses_attachments')
export class AttachmentController {
  constructor(
    @Inject('courses_service')
    private readonly coursesServiceClient: ClientProxy,
  ) {}

  @Get('health')
  async healthCheck() {
    return this.coursesServiceClient.send(
      { cmd: 'attachment_health_check' },
      {},
    );
  }

  @Get()
  async getAllAttachments() {
    return this.coursesServiceClient.send({ cmd: 'get_all_attachments' }, {});
  }

  @Get(':id')
  async getOneAttachment(@Param('id') id: number) {
    return this.coursesServiceClient.send({ cmd: 'get_one_attachment' }, id);
  }

  @Post()
  async createAttachment(
    @Body() CreateCourseAttachmentDto: CreateCourseAttachmentDto,
  ) {
    return this.coursesServiceClient.send(
      { cmd: 'create_attachment' },
      CreateCourseAttachmentDto,
    );
  }

  @Put(':id')
  async updateAttachment(
    @Param('id') id: number,
    @Body() UpdateCourseAttachmentDto: UpdateCourseAttachmentDto,
  ) {
    return this.coursesServiceClient.send(
      { cmd: 'update_attachment' },
      { id, updateData: UpdateCourseAttachmentDto },
    );
  }

  @Delete(':id')
  async deleteAttachment(@Param('id') id: number) {
    return this.coursesServiceClient.send({ cmd: 'delete_attachment' }, id);
  }
}
