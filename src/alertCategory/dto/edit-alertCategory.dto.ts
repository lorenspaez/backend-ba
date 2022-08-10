import {
  IsOptional,
  IsString,
  IsNotEmpty
} from 'class-validator';

export class EditAlertCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  photo?: string;

}
