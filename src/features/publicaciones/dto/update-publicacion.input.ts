import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreatePublicacionInput } from './create-publicacion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePublicacionInput extends PartialType(
  CreatePublicacionInput,
) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  publicacion_id: number;
}
