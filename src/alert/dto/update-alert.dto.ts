import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDto } from './create-alert.dto';
import {
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
  } from 'class-validator';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
    
  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  volunteerId?: number;

  @IsString()
  @IsOptional()
  volunteerName?: string;

  @IsString()
  @IsOptional()
  specie: string;

  @IsString()
  @IsOptional()
  alertCategoryName: string;

  @IsString()
  @IsOptional()
  body: string;

  @IsString()
  @IsOptional()
  neededElementName: string

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  providedElementName?: string

  @IsString()
  @IsOptional()
  userPhone?: string

  @IsString()
  @IsOptional()
  volunteerPhone?: string

  @IsNumber()
  @IsOptional()
  latitude: string;

  @IsNumber()
  @IsOptional()
  longitude: string;

  @IsString()
  @IsOptional()
  status?: string; 
}
