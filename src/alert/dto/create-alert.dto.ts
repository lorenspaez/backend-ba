import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';

export class CreateAlertDto {
    @IsString()
    @IsNotEmpty()
    specie: string;

    @IsString()
    @IsNotEmpty()
    alertType: string;

    @IsString()
    @IsNotEmpty()
    body: string;

    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;

    @IsString()
    @IsOptional()
    photo?: string;

    @IsString()
    @IsOptional()
    status?: string; 
}
