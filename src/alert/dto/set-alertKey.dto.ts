import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDto } from './create-alert.dto';
import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';

export class SetAlertKeyDto extends PartialType(CreateAlertDto) {
    
  @IsString()
  @IsNotEmpty()
  alertKey: string;

}
