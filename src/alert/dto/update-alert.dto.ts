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
    status: string;    

    @IsString()
    @IsOptional()
    specie?: string;

    @IsString()
    @IsOptional()
    alertType?: string;

    @IsString()
    @IsOptional()
    body?: string;

    @IsNumber()
    @IsOptional()
    latitude?: number;

    @IsNumber()
    @IsOptional()
    longitude?: number;

    @IsString()
    @IsOptional()
    photo?: string;
}
