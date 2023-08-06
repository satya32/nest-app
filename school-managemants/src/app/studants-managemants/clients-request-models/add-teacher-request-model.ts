// teacher.dto.ts

import { IsEnum, IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";
import { UserStatus } from "src/constants/status-constant";

export class CreateTeacherRequestModel {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  email_id: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  mobile_number: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsEnum(UserStatus)
  status: string;

  @IsOptional()
  @IsString()
  permissions: string
}
