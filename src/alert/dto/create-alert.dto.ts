import {
    IsNotEmpty,
    isNumber,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsOptional()
  volunteerName?: string;

  @IsString()
  @IsNotEmpty()
  specie: string;

  @IsString()
  @IsNotEmpty()
  alertCategory: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  neededElement: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  providedElement?: string;

  @IsString()
  @IsOptional()
  userPhone?: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
