import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  IsDate,
  MaxLength,
} from 'class-validator';

export class CreateCourseDto {
  @IsInt()
  @IsNotEmpty()
  coach_id: number;

  @IsInt()
  @IsOptional()
  category_id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  max_participants: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsDate()
  @IsNotEmpty()
  start_time: Date;

  @IsDate()
  @IsNotEmpty()
  end_time: Date;
}

export class UpdateCourseDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsOptional()
  coach_id?: number;

  @IsInt()
  @IsOptional()
  category_id?: number;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  max_participants?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsDate()
  @IsOptional()
  start_time?: Date;

  @IsDate()
  @IsOptional()
  end_time?: Date;
}
