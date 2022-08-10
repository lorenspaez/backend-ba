import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';

export class CreateAlertElementDto {
  @IsString()
  @IsNotEmpty()
  name: string;d
}
