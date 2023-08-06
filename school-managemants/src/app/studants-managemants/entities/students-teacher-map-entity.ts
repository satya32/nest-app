import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Students } from "./students-entity";
import { Teachers } from "./teacher-entity";

@Entity('students_teacher_map')
export class StudentsTeacherMap{

@PrimaryGeneratedColumn({name:'students_teacher_map_id'})
 students_teacher_map_id: number;

  @ManyToOne(() => Students, (students) => students.student_id)
  @JoinColumn({ name: 'student_id' })
  @Column({ name: 'student_id', select: true })
  student_id: number;

  @ManyToOne(() => Teachers, (teachers) => teachers.teacher_id)
  @JoinColumn({ name: 'teacher_id' })
  @Column({ name: 'teacher_id', select: true })
  teacher_id: number;


 }
