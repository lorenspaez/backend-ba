import {
  IsOptional,
  IsString,
  IsNotEmpty
} from 'class-validator';

export class EditAlertElementDto {
  @IsString()
  @IsOptional()
  name?: string;
}
