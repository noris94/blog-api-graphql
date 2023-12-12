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


![Imagen de ApolloServer Playground](https://raw.githubusercontent.com/noris94/images/main/playgrund-apollo.png)

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

## Autenticación y seguridad

La aplicación cuenta con algunas capas de seguridad entre las cuales se encuentran:

- CORS
- Rate Limit por cliente (para evitar ataques DOS y DDOS)
- Validaciones de DTO's
- Capa de base de datos usando ORM, el cual incluye proteccion XSS.
- Autenticación por medio de JWT

### Autenticación
Todas las operaciones de GraphQL a excepción de la mutación CreateUsuario estan protegidas para que solamente mediante un JWT enviado en un Header de Authorization tipo Bearer se pueda acceder.

Para obtener el token de autorización es necesario mandar el email de usuario y contraseña a la siguiente ruta (usando *Postman* o algun cliente HTTP):

`POST /auth/login`

**Body:**

```
{
	"email":"1234@ejemplo.com",
	"password":"P45sw0rD"
}
```

Esta ruta regresa una respuesta HTTP 200 OK de este tipo:
```
  {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ejM0QGpha..."
  }
```

Una vez obtenido el token, para poder hacer consultas y mutaciones de GraphQL es necesario enviarse en el Header de Authorization de la siguiente manera:

```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ejM0QGpha...
```

### Authenticacion usando Playground

Para poder enviar el Header con el token de autorización es necesario seleccionar la pestaña de abajo llamada `HTTP HEADERS` y ahi pegar tu token de la siguiente manera:

```
{
  "Authorization" : "Bearer <token>"
}
```

![Imagen de ApolloServer Playground HTTP Headers](https://raw.githubusercontent.com/noris94/images/main/playgrund-apollo-http-headers.png)

