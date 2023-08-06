import { Injectable, Logger } from '@nestjs/common';
import { StudentsManagementsRepository } from '../repository/studants-managemants.repository';
import { AdminRequestModel } from '../clients-request-models/admin-request-model';
import { ResponseModel } from '../response-model.ts/response-model';
import { HttpStatus } from 'src/constants/http-status-constants';
import { Admins } from '../entities/admin-entity';
import { CreateStudentRequestModel } from '../clients-request-models/student-request-model';
import { Students } from '../entities/students-entity';
import { StudentTeacherMapRequestModel } from '../clients-request-models/teacher-students-map-request-model';
import { CreateTeacherRequestModel } from '../clients-request-models/add-teacher-request-model';
// import { Logger } from 'typeorm';

@Injectable()
export class StudentsManagementsService {
    private readonly logger:Logger = new Logger(StudentsManagementsService.name)
 constructor(private readonly studentsManagementsRepository:StudentsManagementsRepository){

 }

 async createAdmin(adminRequestModel:AdminRequestModel):Promise<ResponseModel>
 {
   this.logger.debug('Inside : StudentsManagementsService : createAdmin : ');

   if(!adminRequestModel){
    const responseModel:ResponseModel = new ResponseModel(
    'Invalid request !',
    HttpStatus.FAILED_CODE,
    [],
    )
   return responseModel
   }

   const DbResponse = await this.studentsManagementsRepository.createAdmin(adminRequestModel);
    if(DbResponse){
        const responseModel:ResponseModel = new ResponseModel(
           'Admins created successfully !',
            HttpStatus.SUCCESS_CODE,
            DbResponse,
            )
        return responseModel
    }else{
        const responseModel:ResponseModel = new ResponseModel(
            'db errors!',
             HttpStatus.GLOBAL_ERROR_CODE,
             [],
             )
         return responseModel 
    }
 }
 async getAdminById(adminId:number):Promise<Admins>{
    this.logger.debug('Inside : StudentsManagementsService : getAdminById : ');
 
   if(!adminId){
    const responseModel:ResponseModel = new ResponseModel(
        'Invalid request !',
        HttpStatus.FAILED_CODE,
        [],
        )
    //    return responseModel
    }
    return await this.studentsManagementsRepository.getAdminById(adminId);
}
// createStudent

async createStudent(createStudentRequestModel:CreateStudentRequestModel):Promise<ResponseModel>{
    this.logger.debug('Inside : StudentsManagementsService : createStudent : ');
 
   if(!createStudentRequestModel){
    const responseModel:ResponseModel = new ResponseModel(
        'Invalid request !',
        HttpStatus.FAILED_CODE,
        [],
        )
       return responseModel
    }
    const studentDbResponse =  await this.studentsManagementsRepository.createStudent(createStudentRequestModel);
     console.log('studentDbResponse :',studentDbResponse);
    if(studentDbResponse){
        const responseModel:ResponseModel = new ResponseModel(
            'Admins created successfully !',
             HttpStatus.SUCCESS_CODE,
             studentDbResponse,
             )
         return responseModel

    }else{
        const responseModel:ResponseModel = new ResponseModel(
            'db errors!',
             HttpStatus.GLOBAL_ERROR_CODE,
             [],
             )
         return responseModel 
    }
    
}

async getStudents():Promise<ResponseModel>{
  this.logger.debug('Inside : StudentsManagementsService : getStudents ');
  
  try{
  const studentList : Students[] =  await this.studentsManagementsRepository.getStudents();

  console.log(' studentList :' , studentList);
  if(studentList){
    const responseModel:ResponseModel = new ResponseModel(
        'Students List ',
        HttpStatus.SUCCESS_CODE,
        studentList,
        )
       return responseModel

  }else{
    const responseModel:ResponseModel = new ResponseModel(
        'Invalid request !',
        HttpStatus.FAILED_CODE,
        [],
        )
       return responseModel
  }

  }catch(error){
   console.log('Inside catch : block : ' , error);
   const responseModel:ResponseModel = new ResponseModel(
    'unexpected errors !',
    HttpStatus.GLOBAL_ERROR_CODE,
    error,
    )
   return responseModel
  }
}
async getStudentById(studentId:number):Promise<ResponseModel>{
 this.logger.debug('Inside : StudentsManagementsService : getStudents ');
 console.log(' studentId : ' , studentId);

if(!studentId){
    const responseModel:ResponseModel = new ResponseModel(
        'Invalid request !',
        HttpStatus.FAILED_CODE,
        [],
        )
       return responseModel
}

try{
  const studentDoc : Students =  await this.studentsManagementsRepository.getStudentById(studentId);

  console.log(' studentDoc :' , studentDoc);
  if(studentDoc){
    const responseModel:ResponseModel = new ResponseModel(
        'Student !',
        HttpStatus.SUCCESS_CODE,
        studentDoc
        )
       return responseModel

  }else{
    const responseModel:ResponseModel = new ResponseModel(
        'Invalid request !',
        HttpStatus.FAILED_CODE,
        [],
        )
       return responseModel
  }

  }catch(error){
   console.log('Inside catch : block : ' , error);
   const responseModel:ResponseModel = new ResponseModel(
    'unexpected errors !',
    HttpStatus.GLOBAL_ERROR_CODE,
    error,
    )
   return responseModel
  }
}

async update(studentId:number ,createStudentRequestModel:CreateStudentRequestModel ):Promise<ResponseModel>{

    this.logger.debug('Inside : StudentsManagementsService : update ');
    console.log(' studentId : ' , studentId);
    if(!studentId || !createStudentRequestModel){
        const responseModel:ResponseModel = new ResponseModel(
            'Invalid request !',
            HttpStatus.FAILED_CODE,
            [],
            )
     return responseModel
    }
    try{

        const studentDoc : Students =  await this.studentsManagementsRepository.update(studentId, createStudentRequestModel);

        console.log(' studentDoc :' , studentDoc);
        if(studentDoc){
          const responseModel:ResponseModel = new ResponseModel(
              'Student updated successfully!',
              HttpStatus.SUCCESS_CODE,
            
              )
             return responseModel
      
        }else{
          const responseModel:ResponseModel = new ResponseModel(
              'Data Not found !',
              HttpStatus.DATA_NOT_FOUND,
              [],
              )
             return responseModel
        }
      
    }catch(error){
        console.log('inside catch error : ' , error);
        const responseModel:ResponseModel = new ResponseModel(
            'unexpected errors !',
            HttpStatus.GLOBAL_ERROR_CODE,
            error,
            )
           return responseModel
    }

}

//  soft delete :
 async deleteStudents(studentId:number):Promise<ResponseModel>{
    this.logger.debug('Inside :  StudentsManagementsService : deleteStudents');
    if(!studentId){
        const responseModel:ResponseModel = new ResponseModel(
            'Invalid request !',
            HttpStatus.FAILED_CODE,
            [],
            )
     return responseModel
    }
   try{

    const studentDoc : Students =  await this.studentsManagementsRepository.deleteStudents(studentId);
    console.log(' studentDoc : ' , studentDoc);
    if(studentDoc){
        const responseModel:ResponseModel = new ResponseModel(
            'Student has been deleted!',
            HttpStatus.SUCCESS_CODE,
          
            )
           return responseModel
    }
   }catch(error){
 console.log('inside : catch block : ' , error);
 const responseModel:ResponseModel = new ResponseModel(
    'unexpected errors !',
    HttpStatus.GLOBAL_ERROR_CODE,
    error,
    )
   return responseModel
   }
 }

 async teacherStudentMap(studentTeacherMapRequestModel:StudentTeacherMapRequestModel):Promise<ResponseModel>{
    this.logger.debug('Inside : StudentsManagementsService : teacherStudentMap');

    if(!studentTeacherMapRequestModel?.studentIds || !studentTeacherMapRequestModel?.teacherIds){
        const responseModel:ResponseModel = new ResponseModel(
            'Invalid request !',
            HttpStatus.FAILED_CODE,
            [],
            )
     return responseModel
    }else if(studentTeacherMapRequestModel?.studentIds.length > 0 && 
        studentTeacherMapRequestModel?.teacherIds?.length > 0){
    try{

        const dbResponse:any = await this.studentsManagementsRepository.teacherStudentMap(studentTeacherMapRequestModel);
        console.log(' dbResponse :' , dbResponse);
        if(dbResponse){
            const responseModel:ResponseModel = new ResponseModel(
                'Teacher student mapped successfully !',
                HttpStatus.SUCCESS_CODE,
                [],
                )
         return responseModel

        }
    }catch(error){
        console.log('inside : catch block : ' , error);
        const responseModel:ResponseModel = new ResponseModel(
           'unexpected errors !',
           HttpStatus.GLOBAL_ERROR_CODE,
           error,
           )
          return responseModel
    }
}
 }

 async addTeacher(createTeacherRequestModel:CreateTeacherRequestModel):Promise<ResponseModel>{

    this.logger.debug('Inside : StudentsManagementsService : addTeacher');

    if(!createTeacherRequestModel){
        const responseModel:ResponseModel = new ResponseModel(
            'Invalid request !',
            HttpStatus.FAILED_CODE,
            [],
            )
     return responseModel
    }
    try{


     const dbResponse :any =  await this.studentsManagementsRepository.addTeacher(createTeacherRequestModel);

    console.log(' dbResponse : ' , dbResponse);
     if(dbResponse){
        const responseModel:ResponseModel = new ResponseModel(
            'Teacher added successfully !',
            HttpStatus.SUCCESS_CODE,
            [],
            )
     return responseModel

      }

    }catch(error:any){
        console.log('inside : catch block : ' , error);
        const responseModel:ResponseModel = new ResponseModel(
           'unexpected errors !',
           HttpStatus.GLOBAL_ERROR_CODE,
           error,
           )
          return responseModel

    }

 }
}
