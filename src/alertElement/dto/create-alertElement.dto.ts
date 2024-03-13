import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlertElementDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  d;
}
