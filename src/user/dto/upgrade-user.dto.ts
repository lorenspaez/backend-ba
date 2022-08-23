import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class UpgradeUserDto {
    @IsBoolean()
    @IsOptional()
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
    @IsOptional()
    organizationId?: number;

    @IsString()
    @IsOptional()
    patente: string;

    @IsString()
    @IsOptional()
    sector: string;

    @IsString()
    @IsOptional()
    comuna: string;

    @IsString()
    @IsOptional()
    region: string;
  }
  