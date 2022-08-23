import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class SetUserKeyDto {
    @IsString()
    @IsNotEmpty()
    userKey: string;

  }
  