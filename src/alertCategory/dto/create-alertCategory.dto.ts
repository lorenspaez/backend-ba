import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlertCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsString()
  @IsNotEmpty()
  colour: string;
}
