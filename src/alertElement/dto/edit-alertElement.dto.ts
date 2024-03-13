import { IsOptional, IsString } from 'class-validator';

export class EditAlertElementDto {
  @IsString()
  @IsOptional()
  name?: string;
}
