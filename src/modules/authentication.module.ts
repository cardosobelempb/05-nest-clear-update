import { Encrypter } from '@/shared/application/cryptography/encrypter'
import { HashComparer } from '@/shared/application/cryptography/hash-comparer'
import { JwtStrategy } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { JwtAuthGuard } from '@/shared/infrastructure/guards/jwt/JwtAuth.guard'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { EnvService } from '@/shared/infrastructure/env/env.service'
import { UserPrismaRepository } from './application/repositories/prisma/user-prisma.repository'
import { AuthenticationSigninUseCase } from './application/use-cases/authentication/signin/authentication-signin.usecase'
import { CryptoGraphyModule } from './cryptography.module'
import { DatabaseModule } from './database.module'
import { EnvModule } from './env.module'
import { AuthenticationSigninController } from './infrastructure/controllers/authentication/authentication-signin/authentication-signin.controller'

@Module({
  imports: [
    DatabaseModule,
    CryptoGraphyModule,
    PassportModule,
    EnvModule,
    JwtModule.registerAsync({
      global: true,
      imports: [EnvModule],
      useFactory(envService: EnvService) {
        const jwtPrivateKey = envService.get('JWT_PRIVATE_KEY')
        const jwtPublicKey = envService.get('JWT_PUBLIC_KEY')
        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(jwtPrivateKey, 'base64'),
          publicKey: Buffer.from(jwtPublicKey, 'base64'),
        }
      },
      inject: [EnvService],
    }),
  ],
  controllers: [AuthenticationSigninController],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
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
      inject: [Encrypter,HashComparer, UserPrismaRepository],
    },
  ],
})
export class AuthenticationModule {}
