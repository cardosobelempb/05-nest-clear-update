import { Encrypter } from '@/shared/application/cryptography/encrypter'
import { HashComparer } from '@/shared/application/cryptography/hash-comparer'
import { EnvService } from '@/shared/infrastructure/env/env.service'
import { JwtStrategy } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { JwtAuthGuard } from '@/shared/infrastructure/guards/jwt/JwtAuth.guard'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserRepository } from '../application/repositories/user.repository'
import { AuthenticationSigninUseCase } from '../application/use-cases/authentication/authentication-signin.usecase'
import { CryptoGraphyModule } from './cryptography.module'
import { DatabaseModule } from './database.module'
import { EnvModule } from './env.module'
import { AuthenticationSigninController } from '../infrastructure/controllers/authentication/authentication-signin.controller'

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
        userRepository: UserRepository,
      ) => {
        return new AuthenticationSigninUseCase(
          encrypter,
          hashCompare,
          userRepository,
        )
      },
      inject: [Encrypter, HashComparer, 'UserRepository'],
    },
  ],
})
export class AuthenticationModule {}
