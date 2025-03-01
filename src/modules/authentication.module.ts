import { EnvType } from '@/shared/infrastructure/env/env'
import { JwtStrategy } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { DatabaseModule } from './database.module'
import { AuthenticationSigninController } from './infrastructure/controllers/authentication/authentication-signin/authentication-signin.controller'
import { CryptoGraphyModule } from './infrastructure/cryptography/cryptography.module'

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    CryptoGraphyModule,
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
  providers: [JwtStrategy],
})
export class AuthenticationModule {}
