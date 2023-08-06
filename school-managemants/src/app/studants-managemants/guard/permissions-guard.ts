
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { CLIENT_RENEG_LIMIT } from "tls";
import { StudentsManagementsService } from "../services/studants-managemants.service";
import { Admins } from "../entities/admin-entity";

@Injectable()
export class PermissionGuard implements CanActivate{
  constructor( private adminService: StudentsManagementsService){}
  async canActivate( context: ExecutionContext):Promise<boolean>{
    console.log('Inside : PermissionGuard :');
    const request = context.switchToHttp().getRequest();

    console.log(request?.user?.permissions);
 try{

  const adminId :number = request?.user?.id;
  console.log('adminId : ' , adminId);

  const adminDoc: Admins = await this.adminService.getAdminById(adminId);
  console.log('adminDoc :' , adminDoc);


  const grantedPermissions: string[] = request?.user?.permissions?.filter(
          (permission: string) => {
            return adminDoc?.permissions?.includes(permission);
          })
    
          console.log(' grantedPermissions :' , grantedPermissions);

    // check user_type : 
    if(request?.user?.user_type == 'admin' && adminDoc?.user_role === 'admin'){
       return true 
    } 

    if (grantedPermissions?.length > 0) {
            
    console.log('user?.grantedPermissions ', grantedPermissions);
             return true;
       }else{
        throw new UnauthorizedException('Unauthorized user');
       }


 }catch(err){
   console.log('inside catch : block');
   throw new UnauthorizedException('Unauthorized user');
 }
  }
}