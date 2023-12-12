import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PublicacionesService } from './publicaciones.service';
import { Publicacion } from './entities/publicacion.entity';
import { CreatePublicacionInput } from './dto/create-publicacion.input';
import { UpdatePublicacionInput } from './dto/update-publicacion.input';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@Resolver(() => Publicacion)
@UseGuards(AuthGuard)
export class PublicacionesResolver {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  @Mutation(() => Publicacion)
  createPublicacion(
    @Args('createPublicacionInput')
    createPublicacionInput: CreatePublicacionInput,
  ) {
    return this.publicacionesService.create(createPublicacionInput);
  }

  @Query(() => [Publicacion], { name: 'publicaciones' })
  findAll() {
    return this.publicacionesService.findAll();
  }

  @ResolveField(() => Usuario, { name: 'usuario' })
  getUsuarioInfo(@Parent() publicacion: Publicacion) {
    const { usuario_id } = publicacion;
    return this.publicacionesService.getInfoUsuario(usuario_id);
  }

  @Query(() => Publicacion, { name: 'publicacion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.publicacionesService.findOne(id);
  }

  @Mutation(() => Publicacion)
  updatePublicacion(
    @Args('updatePublicacionInput')
    updatePublicacionInput: UpdatePublicacionInput,
  ) {
    return this.publicacionesService.update(
      updatePublicacionInput.publicacion_id,
      updatePublicacionInput,
    );
  }

  @Mutation(() => Boolean)
  async removePublicacion(@Args('id', { type: () => Int }) id: number) {
    await this.publicacionesService.remove(id);
    return true;
  }
}
