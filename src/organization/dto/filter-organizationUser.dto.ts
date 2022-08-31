import { IsOptional, IsString } from 'class-validator';

export class FilterOrganizationUserDto {
  @IsString()
  @IsOptional()
  readonly name: string;
}
