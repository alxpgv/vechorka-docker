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
