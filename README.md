## start

- nest new 05-nest-clear

## Eslint

- npm i eslint @rocketseat/eslint-config -D
  .eslintrc.json
  {
  "extends": "@rocketseat/eslint-config/node",
  "no-useless-controller": "off"
  }

## Dep

- npm i @nestjs/config
- npm i bcryptjs
- npm i @types/bcryptjs -D
- npm i dotenv -D

## JWT

- npm i @nestjs/jwt
- npm i @nestjs/passport
- npm i passport-jwt
- npm i @types/passport-jwt -D

## Validation

- npm i zod
- npm i zod-validation-error

## Docker

- docker-compose up -d

## Prisma

- npm i prisma -D
- npm i @prisma/client
- npx prisma init
- npx prisma migrate dev

## KEY

### private

- openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
- certutil -encode private_key.pem private_key.txt

### public

- openssl rsa -pubout -in private_key.pem -out public_key.pub
- certutil -encode public_key.pub public_key.txt

## Vitest

- npm i vitest -D
- npm i unplugin-swc -D
- npm i @swc/core -D
- npm i @vitest/coverage-v8 -D
- npm i vite-tsconfig-paths -D
- npm i supertest -D
- npm i @types/supertest -D
