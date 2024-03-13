import { IsOptional, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsOptional()
  userId?: number;

  @IsString()
  @IsOptional()
  alertKey: string;

  @IsString()
  @IsOptional()
  token: string;
}
