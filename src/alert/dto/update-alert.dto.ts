import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDto } from './create-alert.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  specie: string;

  @IsString()
  @IsOptional()
  alertCategoryName: string;

  @IsString()
  @IsOptional()
  body: string;

  @IsOptional()
  neededElementName: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsOptional()
  providedElementName?: string;

  @IsString()
  @IsOptional()
  userPhone?: string;

  @IsString()
  @IsOptional()
  volunteerPhone?: string;

  @IsString()
  @IsOptional()
  arrivalTime?: string;

  @IsNumber()
  @IsOptional()
  latitude: string;

  @IsNumber()
  @IsOptional()
  longitude: string;
}
