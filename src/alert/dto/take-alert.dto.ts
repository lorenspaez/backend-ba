import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDto } from './create-alert.dto';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';

export class TakeAlertDto extends PartialType(CreateAlertDto) {

  @IsOptional()
  providedElementName?: string[]

  @IsString()
  @IsOptional()
  volunteerPhone?: string

  @IsString()
  @IsOptional()
  arrivalTime?: string

}
