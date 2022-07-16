import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpgradeOrganizationDto {
  
  @IsString()
  @IsNotEmpty()
  rutPresidente: string;

  @IsString()
  @IsNotEmpty()
  rutSecretario: string;

  @IsString()
  @IsNotEmpty()
  rutTesorero: string;

  @IsString()
  @IsNotEmpty()
  rutFoundation: string;

  @IsString()
  @IsNotEmpty()
  certificationDocument: string

  @IsString()
  @IsNotEmpty()
  isFoundation: string;
}
