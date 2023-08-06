import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JWT_SECRETE_KEY } from 'src/constants/jwt-constant';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  async canActivate(
    context: ExecutionContext,
    
  ): Promise<boolean>  {
    console.log("Inside : AuthGuard : ")
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(' ')[1]
     console.log(token);
     if(!token){
        throw new UnauthorizedException();
     }
     try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: JWT_SECRETE_KEY.KEY
          }
        );

        request.user= payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }  
}