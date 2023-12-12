import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { Publicacion } from '../publicaciones/entities/publicacion.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Usuario)
export class UsuariosResolver {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Mutation(() => Usuario)
  createUsuario(
    @Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput,
  ) {
    return this.usuariosService.create(createUsuarioInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Usuario], { name: 'usuarios' })
  findAll() {
    return this.usuariosService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => Usuario, { name: 'usuario' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usuariosService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ResolveField(() => [Publicacion])
  publicaciones(@Parent() usuario: Usuario) {
    const { usuario_id } = usuario;
    return this.usuariosService.findPosts(usuario_id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Usuario)
  updateUsuario(
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
  ) {
    return this.usuariosService.update(
      updateUsuarioInput.usuario_id,
      updateUsuarioInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Usuario)
  removeUsuario(@Args('id', { type: () => Int }) id: number) {
    return this.usuariosService.remove(id);
  }
}
