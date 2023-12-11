import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Publicacion } from 'src/features/publicaciones/entities/publicacion.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Usuario {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Id Usuario autogenerado' })
  usuario_id: number;

  @Field()
  @Column()
  nombre: string;

  @Column()
  password: string;

  @Field()
  @Column()
  email: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ type: 'timestamp' })
  fechaCreacion: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar_url?: string;

  @OneToMany(() => Publicacion, (publicacion) => publicacion.usuario, {
    cascade: true,
  })
  @Field(() => [Publicacion])
  publicaciones: Publicacion[];
}
