import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { PublicacionesService } from '../publicaciones/publicaciones.service';
import * as argon2 from 'argon2';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @Inject(forwardRef(() => PublicacionesService))
    private publicacionesService: PublicacionesService,
  ) {}
  async create(createUsuarioInput: CreateUsuarioInput) {
    const password = await argon2.hash(createUsuarioInput.password);
    const usuarioAInsertar = { ...createUsuarioInput, password };
    const newUser = this.usuarioRepository.create(usuarioAInsertar);
    return this.usuarioRepository.save(newUser);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return this.usuarioRepository.findOne({ where: { usuario_id: id } });
  }

  update(id: number, updateUsuarioInput: UpdateUsuarioInput) {
    return this.usuarioRepository.update(
      { usuario_id: id },
      updateUsuarioInput,
    );
  }

  remove(id: number) {
    return this.usuarioRepository.delete({ usuario_id: id });
  }

  findPosts(usuario_id: number) {
    return this.publicacionesService.getPublicacionesUsuario(usuario_id);
  }

  findByEmail(email: string) {
    return this.usuarioRepository.findOne({ where: { email } });
  }
}
