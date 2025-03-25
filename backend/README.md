## start

# Recuperação de senha

**Requesitos funcionais**

- o usuário deve poder recuper sua senha informando o seu email;
- o usuário deve receber um email com istruções de recuperação de senha;
- o usuário deve poder resetar sua senha;

**Requesitos não funcionais**

- utilizar mailtrap para testar envios em ambientes de dev;
- utizar amazon ses para envio em produção;
- o envio de emill deve acontecer em segundo plano (bacground job);

**Regras de negocios**

- o link enviado por email para resetar a senha, deve expirar em 2h;
- o usuário precisa confirmar a nova senha ao resetar sua senha;

# atualização do perfil

**RF**

- o usuário deve poder atualizar seu nome, emial e senha;

**RNF**

**RN**

- o usuário não pode altear seu emil para já utilizado;
- o usuário para atualiar sua senha, deve informar sua senha antiga;
- o usuário para atualizar sua senha, precisa infirmar a nova senha;

# painel do prestador

**RF**

- o usuário deve poder listar seus agendamentos de um dia específico;
- o prestador deve receber uma notificação sempre que houve um novo agendamento;
- o prestador deve poder visializar as noificações não lidas;

**RNF**

- os agendamentos do prestador no dia devem ser armazenado em cache;
- as notificações do prestador devem ser armazenadas no mongoDB;
- as notificações do prestador devem ser envidas em tempo-real utilizando socket.io;

**RN**

- a notificação deve ter um status de lida ou não-lida para o prestador possa controllar;

# Agendamentos de serviços

**RF**

- o usuário deve poder listar todos prestadores de serviços cadastrados;
- o usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- o usuário deve poder listar horário disponível em um dia específico de um prestador;
- o usuário deve poder realizar um novo agendamento com um prestador;

**RFN**

- a listagem de prestadores deve ser armazenado em cache;

**RN**

- cada agendamento deve durar 1h exatamente;
- os agendamentos devem estar disponível entre 8h ás 18h (Primeiro ás 8h, úlimo ás 17h);
- o usuário não pode agendar um horário já ocupado;
- o usuário não pode agendar em um horário que já passou;
- o usuário não pode agendar serviços consigo mesmo

## initial

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

## Vitest test

- npm i vitest -D
- npm i unplugin-swc -D
- npm i @swc/core -D
- npm i @vitest/coverage-v8 -D
- npm i vite-tsconfig-paths -D
- npm i supertest -D
- npm i @types/supertest -D
- npm i @faker-js/faker -D
