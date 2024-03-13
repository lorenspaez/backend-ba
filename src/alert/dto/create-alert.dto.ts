import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlertDto {
  @IsOptional()
  userId?: number;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsOptional()
  volunteerName?: string;

  @IsString()
  @IsNotEmpty()
  specie: string;

  @IsString()
  @IsNotEmpty()
  alertCategoryName: string;

  @IsString()
  @IsNotEmpty()
  alertCategoryColour: string;

  @IsString()
  @IsNotEmpty()
  alertCategoryPhoto: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  neededElementName: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsOptional()
  providedElementName?: string;

  @IsString()
  @IsOptional()
  userPhone?: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: string;

  @IsNumber()
  @IsNotEmpty()
  longitude: string;
}
