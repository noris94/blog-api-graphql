import { Module, forwardRef } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesResolver } from './publicaciones.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publicacion]),
    forwardRef(() => UsuariosModule),
  ],
  providers: [PublicacionesResolver, PublicacionesService],
  exports: [PublicacionesService],
})
export class PublicacionesModule {}
