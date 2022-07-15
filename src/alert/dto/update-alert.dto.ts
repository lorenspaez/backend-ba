import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDto } from './create-alert.dto';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
    
  @IsString()
  @IsNotEmpty()
  userName?: string;

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
  neededElement: string

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  providedElement?: string

  @IsString()
  @IsOptional()
  userPhone?: string

  @IsString()
  @IsOptional()
  volunteerPhone?: string

  @IsNumber()
  @IsNotEmpty()
  latitude: string;

  @IsNumber()
  @IsNotEmpty()
  longitude: string;

  @IsString()
  @IsOptional()
  status?: string; 
}
