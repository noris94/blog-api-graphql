import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

@InputType()
export class CreateUsuarioInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  @IsNotEmpty()
  password: string;

  @IsUrl()
  @IsOptional()
  @Field({ nullable: true })
  avatar_url?: string;
}
