import { BadRequestException, Injectable } from '@nestjs/common';
import { UsuariosService } from '../features/usuarios/usuarios.service';
import { SignInDto } from './dto/signin.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto) {
    // Check if user exists
    const user = await this.usuariosService.findByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exists');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }
    const payload = { sub: user.email, user_name: user.nombre };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
