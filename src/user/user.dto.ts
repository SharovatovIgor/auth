import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Gender } from './types';

export class CreateUserValidation {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  lastWorkPlace: string;

  @IsNotEmpty()
  education: string;

  @IsNotEmpty()
  specific: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  ahubLink: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  language: string;

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  aboutMe: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  companyId: number | null;
}

export class UserCredsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}