import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { StudentsManagementsService } from '../services/studants-managemants.service';
// import { AdminRequestModel } from '../clients-request-models/admin-request-model';
import { ResponseModel } from '../response-model.ts/response-model';
import { AdminRequestModel } from '../clients-request-models/admin-request-model';
// import { PermissionGuard } from 'src/app/studants-managemants/guard/permissions-guard';
import { AuthGuard } from '../guard/auth-guard';
import { PermissionGuard } from '../guard/permissions-guard';
import { StudentTeacherMapRequestModel } from '../clients-request-models/teacher-students-map-request-model';
import { CreateTeacherRequestModel } from '../clients-request-models/add-teacher-request-model';
// import { CreateTeacherRequestModel } from '../clients-request-models/add-teacher-request-model';

@Controller('adminController')
export class AdminController {
    private readonly logger:Logger = new Logger(AdminController.name)
 constructor(private readonly studentsManagementsService:StudentsManagementsService){

 }
 @UseGuards(AuthGuard , PermissionGuard)
 @Post('createAdmin')
 createAdmin(@Body()adminRequestModel:AdminRequestModel):Promise<ResponseModel>{
    this.logger.debug('inside :AdminController  : createAdmin :');

    return this.studentsManagementsService.createAdmin(adminRequestModel);
    
 }
 @Post('teacherStudentMap')
 teacherStudentMap(@Body()studentTeacherMapRequestModel:StudentTeacherMapRequestModel):Promise<ResponseModel>{
   this.logger.debug('inside :AdminController  : teacherStudentMap :');

    return this.studentsManagementsService.teacherStudentMap(studentTeacherMapRequestModel);

 }
@Post('addTeacher')
addTeacher(@Body() createTeacherRequestModel:CreateTeacherRequestModel):Promise<ResponseModel>{
this.logger.debug("inside : AdminController : addTeacher :");

return this.studentsManagementsService.addTeacher(createTeacherRequestModel)

}
 
}
