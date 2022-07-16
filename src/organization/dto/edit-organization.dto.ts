import {
  IsBoolean,
  IsEmail,
  IsNumber,
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

  @IsString()
  @IsOptional()
  namePresidente?: string;

  @IsString()
  @IsOptional()
  nameSecretario?: string;

  @IsString()
  @IsOptional()
  nameTesorero?: string;
  
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
