// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
// import { StudentEntity } from './admin-entity';
// // import { StudentEntity } from './student.entity';

// @Entity('teachers')
// export class TeacherEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @ManyToMany(() => StudentEntity)
//   @JoinTable()
//   students: StudentEntity[];
// }

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StudentsTeacherMap } from './students-teacher-map-entity';
import { UserStatus } from 'src/constants/status-constant';

@Entity('teacher')
export class Teachers {
  @PrimaryGeneratedColumn({name:'teacher_id'})
  teacher_id: number;

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

  @Column()
  subject: string;

  @Column({
    type: "enum",
    enum:UserStatus,
    default: UserStatus.ACTIVE,
    })
  status: string;

  @Column()
  permissions: string;
}
