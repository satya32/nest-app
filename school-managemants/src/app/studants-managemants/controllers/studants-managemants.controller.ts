import { Body, Controller, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { StudentsManagementsService } from '../services/studants-managemants.service';
import { AuthGuard } from '../guard/auth-guard';
import { PermissionGuard } from '../guard/permissions-guard';
import { CreateStudentRequestModel } from '../clients-request-models/student-request-model';
import { ResponseModel } from '../response-model.ts/response-model';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

@Controller('studentManagements')
@UseGuards(AuthGuard , PermissionGuard)
export class StudentsManagementsController {

    private readonly logger:Logger = new Logger(StudentsManagementsController.name)
    constructor(private readonly studentsManagementsService:StudentsManagementsService){
   
    }
    // create : 
  @Post('createStudent')
//  @UseGuards(AuthGuard , PermissionGuard)
 createStudent(@Body()createStudentRequestModel:CreateStudentRequestModel):Promise<ResponseModel>{
    this.logger.debug('inside : StudentsManagementsController :  createStudent :');

    return this.studentsManagementsService.createStudent(createStudentRequestModel);
    
 } 
//  fetch

@Get('getStudents')
// @UseGuards(AuthGuard , PermissionGuard)
 getStudents():Promise<ResponseModel>{
    this.logger.debug('inside : StudentsManagementsController :  getStudents :');

    return this.studentsManagementsService.getStudents();
    
 } 

 @Get('getStudentById')
 getStudentById(@Param('studentId')studentId:number ):Promise<ResponseModel>{
    this.logger.debug('inside : StudentsManagementsController :  getStudentById :');
     console.log(' studentId : ' , studentId);
    return this.studentsManagementsService.getStudentById(studentId);
    
 } 
//  update
@Post('update')
update(@Param('studentId') studentId: number,
@Body()createStudentRequestModel:CreateStudentRequestModel):Promise<ResponseModel>{

    this.logger.debug('inside : StudentsManagementsController :  update :');
     console.log(' studentId : ' , studentId);
    return this.studentsManagementsService.update(studentId , createStudentRequestModel);
}
}
