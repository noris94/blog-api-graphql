# API Usuarios y Publicaciones con GraphQL

API backend que gestiona un sistema básico de usuarios y publicaciones.

Este backend esta desarrollado usando el framework Nest.js. Para mas informacion de como funciona esta herramienta, visitar su pagina: 
[Nest Docs](https://docs.nestjs.com/)

Ademas esta dockerizado mediante Docker-Compose para correr una instancia de mysql local junto al proyecto de Nest.js

## Requisitos para correr la app

- Tener Docker Desktop instalado y corriendo para correr la instancia de mysql

  ó

- Tener acceso a una conexion de mysql para poder conectarse a esa BD

- Configurar un archivo .env tal como se muestra en example.env


## Instalación (en caso de probar la app de Nest solamente)

```bash
$ npm install
```

## Correr la aplicación

```bash
# usando Docker compose
$ docker-compose up

# Correr la aplicación localmente sin Docker
$ npm run start

# modo debug
$ npm run start:dev

# modo producción
$ npm run start:prod
```

## Scripts de Pruebas

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Operaciones GraphQL

Una vez que la aplicacion, esta corriendo, se puede consultar en un navegador la siguiente url: 
``http://localhost:3000/graphql``
en la cual se despliega un Playground para poder realizar las consultas y mutaciones, asimismo esta herramienta cuenta con su documentacion para ver los tipos del lado derecho, tal como se muestra en la imagen:


![Imagen de ApolloServer Playground](https://www.apollographql.com/docs/3f877c8e310c5ec8a76934d058d511e4/graphql-playground.png)

### Querys

Se cuentan con los siguientes querys
  
  ```
    type Query {
      usuarios: [Usuario!]!
      usuario(id: Int!): Usuario!

      publicaciones: [Publicacion!]!
      publicacion(id: Int!): Publicacion!
    }
  ```

Para mayor detalle de los tipos consultar la documentacion del Playground

## Mutaciones

Se cuentan con las siguientes mutaciones:

```
  type Mutation {
    createUsuario(createUsuarioInput: CreateUsuarioInput!): Usuario!
    updateUsuario(updateUsuarioInput: UpdateUsuarioInput!): Usuario!
    removeUsuario(id: Int!): Usuario!

    createPublicacion(createPublicacionInput: CreatePublicacionInput!): Publicacion!
    updatePublicacion(updatePublicacionInput: UpdatePublicacionInput!): Publicacion!
    removePublicacion(id: Int!): Publicacion!
  }
```

Para mayor detalle de los tipos consultar la documentacion del Playground

