import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EnvType } from '@/shared/infrastructure/env/env'
import { AuthController } from './infrastructure/controllers/auth/auth/auth.controller'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { JwtStrategy } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { DatabaseModule } from './database.module'

@Module({
  imports: [
    DatabaseModule,
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
  controllers: [],
  providers: [JwtStrategy],
})
export class AuthenticationModule {}
