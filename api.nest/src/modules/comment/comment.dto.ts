import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CommentByPostIdParamsDTO {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  postId: number;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(1)
  @Transform(({ value }) => Number(value))
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  offset?: number;
}

export class CreateCommentDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  postId: number;

  @IsString()
  @Length(3, 32)
  author: string;

  @Length(3)
  @IsString()
  content: string;
}
