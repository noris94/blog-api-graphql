import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUsuarioInput } from './create-usuario.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsuarioInput extends PartialType(CreateUsuarioInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  usuario_id: number;
}
