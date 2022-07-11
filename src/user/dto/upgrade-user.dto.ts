import {
    IsBoolean,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class UpgradeUserDto {
    @IsBoolean()
    isVolunteer: boolean;

    @IsString()
    name: string;

    @IsString()
    rut: string;

    @IsString()
    volunteerType: string;
  }
  