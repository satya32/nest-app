// create-student.dto.ts
// import { IsNotEmpty, IsEmail, IsString, IsNumber, MinLength, MaxLength } from 'class-validator';

import { IsEmail, IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";

export class CreateStudentRequestModel {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsNumber()
  student_id?: number;

  @IsNotEmpty()
  @IsNumber()
  roll_number: number;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email_id: string;

  @IsNotEmpty()
  @IsString()
  father_name: string;

  @IsNotEmpty()
  @IsString()
  father_contact_number: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  subjects: string;

  @IsNotEmpty()
  permissions: string;
}
