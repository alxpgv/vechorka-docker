import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class NewspaperParamsDTO {
  @IsOptional()
  @IsNumber()
  @Max(3000)
  @Min(1990)
  @Transform(({ value }) => Number(value))
  year?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  allYears?: boolean;
}
