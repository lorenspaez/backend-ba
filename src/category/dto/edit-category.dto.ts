import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty
} from 'class-validator';

export class EditCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;
}
