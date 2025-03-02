import { Encrypter } from '@/shared/application/cryptography/encrypter'
import { HashComparer } from '@/shared/application/cryptography/hash-comparer'
import { EnvType } from '@/shared/infrastructure/env/env'
import { JwtStrategy } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserPrismaRepository } from './application/repositories/prisma/user-prisma.repository'
import { AuthenticationSigninUseCase } from './application/use-cases/authentication/signin/authentication-signin.usecase'
import { CryptoGraphyModule } from './cryptography.module'
import { DatabaseModule } from './database.module'
import { AuthenticationSigninController } from './infrastructure/controllers/authentication/authentication-signin/authentication-signin.controller'
import { BcryptHasher } from './infrastructure/cryptography/bcrypt-hasher'
import { JwtEncrypter } from './infrastructure/cryptography/jwt-encrypter'

@Module({
  imports: [
    DatabaseModule,
    CryptoGraphyModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory(config: ConfigService<EnvType, true>) {
        const jwtPrivateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const jwtPublicKey = config.get('JWT_PUBLIC_KEY', { infer: true })
        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(jwtPrivateKey, 'base64'),
          publicKey: Buffer.from(jwtPublicKey, 'base64'),
        }
      },
    }),
  ],
  controllers: [AuthenticationSigninController],
  providers: [
    JwtStrategy,
    {
      provide: 'Encrypter',
      useClass: JwtEncrypter
    },
    {
      provide: 'HashComparer',
      useClass: BcryptHasher
    },
    {
      provide: AuthenticationSigninUseCase,
      useFactory: (
        encrypter: Encrypter,
        hashCompare: HashComparer,
        userPrismaRepository: UserPrismaRepository,
      ) => {
        return new AuthenticationSigninUseCase(
          encrypter,
          hashCompare,
          userPrismaRepository,
        )
      },
      inject: ['Encrypter','HashComparer', 'UserPrismaRepository'],
    },
  ],
})
export class AuthenticationModule {}
