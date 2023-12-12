import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const rawHeaders = ctx.getContext().req.rawHeaders;
    const authorizationHeader =
      rawHeaders[rawHeaders.indexOf('Authorization') + 1];
    console.log(2, authorizationHeader);
    const token = this.extractTokenFromHeader(authorizationHeader);
    const jwtSecret = this.configService.get('auth.jwtSecret');

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(
    authorizationHeader: string,
  ): string | undefined {
    const [type, token] = authorizationHeader?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
