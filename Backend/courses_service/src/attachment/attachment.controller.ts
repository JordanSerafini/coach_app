import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttachmentService } from './attachment.service';
import {
  CreateCourseAttachmentDto,
  UpdateCourseAttachmentDto,
} from '../Dtos/attachment.dto';

@Controller()
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @MessagePattern({ cmd: 'attachment_health_check' })
  healthCheck() {
    return { status: 'ok' };
  }

  @MessagePattern({ cmd: 'get_all_attachments' })
  async getAllAttachments() {
    return await this.attachmentService.getAllAttachments();
  }

  @MessagePattern({ cmd: 'get_one_attachment' })
  async getOneAttachment(@Payload() id: number) {
    return await this.attachmentService.getOneAttachment(id);
  }

  @MessagePattern({ cmd: 'create_attachment' })
  async createAttachment(@Payload() data: CreateCourseAttachmentDto) {
    return await this.attachmentService.createAttachment(data);
  }

  @MessagePattern({ cmd: 'update_attachment' })
  async updateAttachment(
    @Payload() data: { id: number; updateData: UpdateCourseAttachmentDto },
  ) {
    return await this.attachmentService.updateAttachment(
      data.id,
      data.updateData,
    );
  }

  @MessagePattern({ cmd: 'delete_attachment' })
  async deleteAttachment(@Payload() id: number) {
    return await this.attachmentService.deleteAttachment(id);
  }
}
