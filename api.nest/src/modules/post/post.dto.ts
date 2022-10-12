// import {Transform, TransformFnParams} from 'class-transformer';
// import {IsInt, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
//
// export class CreatePostDto {
//   @IsOptional()
//   @IsInt()
//   parentId?: number;
//
//   @IsNotEmpty()
//   @IsString()
//   @Length(2, 255)
//   @Transform(({value}: TransformFnParams) => value?.trim())
//   label: string;
//
//   @IsNotEmpty()
//   @IsString()
//   @Length(2, 128)
//   @Transform(({value}: TransformFnParams) => value?.trim())
//   slug: string;
//
//   @IsOptional()
//   @IsString()
//   @Transform(({value}: TransformFnParams) => value?.trim())
//   description?: string;
// }

// @ValidateNested({ each: true })
// @Type(() => Post)
// @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])

import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PostType } from './post.interface';
import { ParseIntPipe } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';

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
