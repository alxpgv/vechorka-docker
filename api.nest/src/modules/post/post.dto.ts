import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PostType } from './post.interface';
import { Transform } from 'class-transformer';

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
  @Transform(({ value }) => {
    const checkArrNumber = (arr) => {
      const arrNumber = [];
      arr.forEach((item) => {
        const number = parseInt(item);
        if (!isNaN(number)) {
          arrNumber.push(number);
        }
      });

      return arrNumber;
    };

    if (typeof value === 'string') {
      const arr = checkArrNumber(value.split(','));
      return arr.length ? arr : value;
    }

    return value;
  })
  @IsArray()
  excludeIds?: number[];
}
