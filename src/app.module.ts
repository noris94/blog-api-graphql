import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsuariosModule } from './features/usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PublicacionesModule } from './features/publicaciones/publicaciones.module';
import { authConfig, databaseConfig, throttlerConfig } from './config/index';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Config module (env vars)
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig, throttlerConfig, authConfig],
    }),
    //GraphQL config
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    //TypeORM config
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    //Throttler Config
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>('throttler.ttl'),
          limit: configService.get<number>('throttler.limit'),
        },
      ],
    }),
    UsuariosModule,
    PublicacionesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
