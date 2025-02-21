import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EnvType } from 'src/shared/env/env'
import { AuthController } from './infra/controllers/auth/auth.controller'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { JwtStrategy } from 'src/shared/infra/guards/jwt/jwt.strategy'

@Module({
  imports: [
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
  controllers: [AuthController],
  providers: [PrismaService, JwtStrategy],
})
export class AuthModule {}
