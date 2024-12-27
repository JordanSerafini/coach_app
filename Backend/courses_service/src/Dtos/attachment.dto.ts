import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsDate,
} from 'class-validator';

export class CreateCourseAttachmentDto {
  @IsInt()
  @IsNotEmpty()
  course_id: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  file_url: string;
}

export class UpdateCourseAttachmentDto {
  @IsInt()
  @IsOptional()
  course_id?: number;

  @IsString()
  @IsOptional()
  @IsUrl()
  file_url?: string;

  @IsDate()
  @IsOptional()
  uploaded_at?: Date;
}
