import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { isValidToken } from '../helpers/jwt.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.authorization.split(' ')[1];
      const refresh = request?.headers?.cookie.split('=')[1];
      return isValidToken(token, refresh);
    } catch (error) {
      return false;
    }
  }
}
