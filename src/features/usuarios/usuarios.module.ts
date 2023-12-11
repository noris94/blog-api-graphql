import { Module, forwardRef } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { PublicacionesModule } from '../publicaciones/publicaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    forwardRef(() => PublicacionesModule),
  ],
  providers: [UsuariosResolver, UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
