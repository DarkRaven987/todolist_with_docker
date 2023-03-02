import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const res = await this.client
        .send(
          { role: 'auth', cmd: 'verify' },
          { jwt: req.get('Authorization').replace('Bearer', '').trim() },
        )
        .pipe(timeout(5000))
        .toPromise();
      return res;
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
