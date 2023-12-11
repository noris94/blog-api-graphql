import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Usuario } from 'src/features/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Publicacion {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Id Publicación autogenerado' })
  publicacion_id: number;

  @Column()
  @Field()
  titulo: string;

  @Column({ type: 'text' })
  @Field()
  contenido: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  fecha_publicacion: Date;

  @Field(() => Int)
  @Column()
  usuario_id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.publicaciones)
  @JoinColumn({ name: 'usuario_id' })
  @Field(() => Usuario)
  usuario: Usuario;
}
