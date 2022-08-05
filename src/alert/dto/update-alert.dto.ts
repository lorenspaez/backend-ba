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
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  volunteerName?: string;

  @IsString()
  @IsOptional()
  specie: string;

  @IsString()
  @IsOptional()
  alertCategory: string;

  @IsString()
  @IsOptional()
  body: string;

  @IsString()
  @IsOptional()
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
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsOptional()
  status?: string; 
}
