import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpgradeOrganizationDto {
  @IsString()
  @IsNotEmpty()
  rutFoundation: string;

  @IsString()
  @IsNotEmpty()
  certificationDocument: string
}
