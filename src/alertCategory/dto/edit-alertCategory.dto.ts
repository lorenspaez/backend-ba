import { IsOptional, IsString } from 'class-validator';

export class EditAlertCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  colour?: string;
}
