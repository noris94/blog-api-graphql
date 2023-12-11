import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreatePublicacionInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  titulo: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(20, { message: 'El contenido debe tener al menos 20 caracteres' })
  contenido: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  usuario_id: number;
}
