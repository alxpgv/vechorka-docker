import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PostType } from './post.interface';
import { Transform } from 'class-transformer';
import { transformToArrayNumber } from '../../utils/pipes';

export class PostQueryParamsDTO {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  offset?: number;

  @IsOptional()
  @IsString()
  postType?: PostType = 'post';

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  sticky?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  taxonomy?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  user?: boolean;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  taxonomyId?: number;

  @IsOptional()
  @Transform(({ value }) => transformToArrayNumber(value))
  @IsArray()
  includeIds?: number[];

  @IsOptional()
  @Transform(({ value }) => transformToArrayNumber(value))
  @IsArray()
  excludeIds?: number[];
}
