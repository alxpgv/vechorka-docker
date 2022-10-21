import { IsNumber, IsOptional, Max, Min } from 'class-validator';
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
