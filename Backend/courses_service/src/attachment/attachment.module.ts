import { Module } from '@nestjs/common';
import { AttachmentController } from './attachment.controller';
import { AttachmentService } from './attachment.service';
import { PgConnectionModule } from 'pool_package';

@Module({
  imports: [PgConnectionModule],
  providers: [AttachmentService],
  controllers: [AttachmentController],
})
export class AttachmentModule {}
