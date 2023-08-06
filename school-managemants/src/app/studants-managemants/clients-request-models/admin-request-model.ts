// import { IsInt, IsNotEmpty, IsEmail, IsString, IsEnum, ArrayNotEmpty, ArrayUnique } from 
// import { UserRole } from '../entities/admin-entity';
// import { UserRole } from '../user-role.enum'; // Import UserRole enum if defined in a separate file

import { ArrayNotEmpty, ArrayUnique, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from "@nestjs/class-validator";
import { UserRole } from "../entities/admin-entity";

export class AdminRequestModel{
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email_id: string;

  @IsNotEmpty()
  @IsString()
  mobile_number: string;

  @IsEnum(UserRole)
  user_role: UserRole;

  permissions: string;
}
