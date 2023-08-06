import { Inject, Injectable, Logger } from '@nestjs/common';
import { AdminRequestModel } from '../clients-request-models/admin-request-model';
import { EntityManager, Repository } from 'typeorm';
import { Admins } from '../entities/admin-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus } from 'src/constants/http-status-constants';
import { ResponseModel } from '../response-model.ts/response-model';
import { Students } from '../entities/students-entity';
import { CreateStudentRequestModel } from '../clients-request-models/student-request-model';
import {  UserStatus } from 'src/constants/status-constant';
import { StudentTeacherMapRequestModel } from '../clients-request-models/teacher-students-map-request-model';
import { StudentsTeacherMap } from '../entities/students-teacher-map-entity';
import { CreateTeacherRequestModel } from '../clients-request-models/add-teacher-request-model';
import { Teachers } from '../entities/teacher-entity';

@Injectable()
export class StudentsManagementsRepository{
    private readonly logger:Logger = new Logger(StudentsManagementsRepository.name)
    constructor(
        @InjectRepository(Admins) private adminRepository: Repository<Admins>,
        @InjectRepository(Students) private studentRepository: Repository<Students>,
       
        @InjectRepository(StudentsTeacherMap) private StudentsTeacherMapRepository: Repository<StudentsTeacherMap>,
         @InjectRepository(Teachers) private teacherRepository: Repository<Teachers>
    ){

    }
    
    async createAdmin(adminRequestModel:AdminRequestModel):Promise<any>{
      this.logger.debug("Inside : StudentsManagementsRepository :  createAdmin ");
    console.log("adminRequestModel :" , adminRequestModel);
    
    let newPermissions ;
    if(adminRequestModel?.permissions){
      newPermissions = JSON.stringify(adminRequestModel?.permissions);

    }
    adminRequestModel.permissions = newPermissions;
    
    const newAdminData : Admins = await this.adminRepository.create(adminRequestModel);

   console.log('newAdminData :' ,newAdminData);

   try{
   return this.adminRepository.save(newAdminData);
   
   }catch(err){
     console.log('error :' ,err );
     return err;
   }

    }
 async getAdminById(adminId:number):Promise<any>{
    this.logger.debug("Inside : StudentsManagementsRepository :  createAdmin ");


   try{
    const adminData = await this.adminRepository.findOneBy({
        id:adminId
    })
   
     console.log(' adminData :' , adminData);
     return adminData;
   }catch(err){
     console.log('error :' ,err );
     return err;
   }
    
    }

    async createStudent(createStudentRequestModel:CreateStudentRequestModel):Promise<any>{
      this.logger.debug("Inside : StudentsManagementsRepository :  createAdmin ");
    console.log("createStudentRequestModel :" , createStudentRequestModel);
    
    let newSubjects ;
    let newPermissions
    if(createStudentRequestModel?.subjects){
      newSubjects = JSON.stringify(createStudentRequestModel?.subjects);

    }
    if(createStudentRequestModel?.permissions){
      newPermissions = JSON.stringify(createStudentRequestModel?.permissions);

    }
    createStudentRequestModel.subjects = newSubjects;
    createStudentRequestModel.permissions = newPermissions;
    
    const newStudents : Students = await this.studentRepository.create(createStudentRequestModel);

   console.log('newStudents :' ,newStudents);

   try{
   return await this.adminRepository.save(newStudents);
   
   }catch(err){
     console.log('error :' ,err );
     return err;
   }
    }
    async getStudents():Promise<Students[]>{
     this.logger.debug('Inside : StudentsManagementsRepository : getStudents') ;
     return this.studentRepository.find({where:{status :UserStatus.ACTIVE}});
    }

  // getStudentById

  async getStudentById(studentId:number):Promise<Students>{
    this.logger.debug("Inside : StudentsManagementsRepository :  studentId ");


   try{
    const studentData = await this.studentRepository.findOneBy({
        student_id:studentId
    })
   
     console.log(' studentData :' , studentData);
     return studentData;
   }catch(err){
     console.log('error :' ,err );
     return err;
   }
    
    }
    async update(studentId: number, createStudentRequestModel:CreateStudentRequestModel): Promise<any> {
      this.logger.debug("Inside : StudentsManagementsRepository :  update ");

      return this.studentRepository
        .createQueryBuilder()
        .update(Students)
        .set(createStudentRequestModel)
        .where("student_id = :studentId", { studentId : studentId })
        .execute();
    
  }
  async deleteStudents(studentId:number):Promise<any>{
    this.logger.debug("Inside : StudentsManagementsRepository :  update ");

    const status : string = UserStatus.DELETED;

    return await this.studentRepository
      .createQueryBuilder()
      .update(Students)
      .set({
        status:status
      })
      .where("student_id = :studentId", { studentId : studentId })
      .execute();
  }
  async teacherStudentMap(studentTeacherMapRequestModel:StudentTeacherMapRequestModel):Promise<any>{

    this.logger.debug("Inside : StudentsManagementsRepository :  teacherStudentMap ");
    console.log(' studentTeacherMapRequestModel : ' , studentTeacherMapRequestModel);
    const mappingsToInsert: StudentsTeacherMap[] = [];

    for (const teacherId of studentTeacherMapRequestModel?.teacherIds) {
      for (const studentId of studentTeacherMapRequestModel?.studentIds) {
        const mapping = new StudentsTeacherMap();
        mapping.student_id = studentId;
        mapping.teacher_id = teacherId;
        mappingsToInsert.push(mapping)
      }
    } 
    // bulk uploading :  
    const entityManager = this.StudentsTeacherMapRepository.manager;
    await entityManager.transaction(async (manager: EntityManager) => {
      await manager.query(
        `INSERT INTO students_teacher_map (student_id, teacher_id) VALUES ${mappingsToInsert
          .map((m) => `(${m.student_id}, ${m.teacher_id})`)
          .join(', ')}`
      );
    });
  }
  async addTeacher(createTeacherRequestModel:CreateTeacherRequestModel):Promise<any>{
 this.logger.debug('Inside  : StudentsManagementsRepository : addTeacher');
 
 const newTeacher : Teachers = await this.teacherRepository.create(createTeacherRequestModel);

 console.log(' newTeacher :' , newTeacher);
  return await this.teacherRepository.save(newTeacher)

  }
  }
  

