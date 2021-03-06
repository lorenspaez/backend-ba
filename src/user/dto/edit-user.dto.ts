import {
    IsBoolean,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class EditUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    photo?: string;

    @IsString()
    @IsOptional()
    organizationName?: string;
  }
  