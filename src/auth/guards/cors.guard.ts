import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class CorsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const res = context.switchToHttp().getResponse();
    res.header['Access-Control-Allow-Origin'] = '*';
    return true;
  }
}
