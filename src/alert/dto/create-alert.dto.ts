import {
    IsNotEmpty,
    IsNumber,
    IsObject,
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
  alertCategoryName: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  neededElementName: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  providedElementName?: string;

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
