import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreatePublicacionInput } from './dto/create-publicacion.input';
import { UpdatePublicacionInput } from './dto/update-publicacion.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Repository } from 'typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectRepository(Publicacion)
    private publicacionRepsitory: Repository<Publicacion>,
    @Inject(forwardRef(() => UsuariosService))
    private usuariosService: UsuariosService,
  ) {}

  create(createPublicacionInput: CreatePublicacionInput) {
    const newPublicacion = this.publicacionRepsitory.create(
      createPublicacionInput,
    );
    return this.publicacionRepsitory.save(newPublicacion);
  }

  findAll() {
    return this.publicacionRepsitory.find();
  }

  findOne(id: number) {
    return this.publicacionRepsitory.findOne({ where: { publicacion_id: id } });
  }

  update(id: number, updatePublicacionInput: UpdatePublicacionInput) {
    return this.publicacionRepsitory.save({
      publicacion_id: id,
      ...updatePublicacionInput,
    });
  }

  async remove(id: number) {
    await this.publicacionRepsitory.delete({ publicacion_id: id });
  }

  getInfoUsuario(usuario_id: number) {
    return this.usuariosService.findOne(usuario_id);
  }

  getPublicacionesUsuario(usuario_id: number) {
    return this.publicacionRepsitory.find({ where: { usuario_id } });
  }
}
