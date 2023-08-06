import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENTS = "student",
}

@Entity('admins')
export class Admins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email_id: string;

  @Column()
  password: string;

  @Column()
  mobile_number: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.ADMIN,
    })
  user_role: UserRole
  
  @Column()
  permissions: string;
}
