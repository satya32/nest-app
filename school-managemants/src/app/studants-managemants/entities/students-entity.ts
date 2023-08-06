import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StudentsTeacherMap } from './students-teacher-map-entity';
import { UserStatus } from 'src/constants/status-constant';

@Entity('students')
export class Students {
  @PrimaryGeneratedColumn({name:'student_id'})
  student_id: number;

  @Column()
  first_name: string;

  @Column()
  roll_number: number;

  @Column()
  last_name: string;

  @Column()
  email_id: string;

  @Column()
  password: string;

  @Column()
  father_name: string;

  @Column()
  father_contact_number: string;

  @Column()
  address: string;

  @Column()
  subjects: string;

  @Column()
  permissions: string;
  
  @Column({
    type: "enum",
    enum:UserStatus ,
    default: UserStatus.ACTIVE,
    })
  status: string;


}
