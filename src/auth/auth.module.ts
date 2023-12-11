import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from 'src/features/usuarios/usuarios.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
    forwardRef(() => UsuariosModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
