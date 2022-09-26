import {
  IsEmail,
  IsOptional,
  IsString,
  IsNotEmpty
} from 'class-validator';

export class EditOrganizationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
  
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  socialMedia?: string;

  @IsString()
  @IsOptional()
  phoneNum?: string;
}
