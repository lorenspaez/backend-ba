import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class UpgradeUserDto {
    @IsBoolean()
    @IsNotEmpty()
    isVolunteer: boolean;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    rut: string;

    @IsString()
    @IsOptional()
    organizationName?: string;

    @IsString()
    @IsNotEmpty()
    volunteerType: string;

    @IsString()
    @IsOptional()
    patente: string;

    @IsString()
    @IsOptional()
    sector: string;
  }
  