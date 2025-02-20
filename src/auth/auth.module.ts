import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EnvType } from 'src/shared/env/env'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService<EnvType, true>) {
        const jwtPublicKey = config.get('JWT_PUBLIC_KEY', { infer: true })
        const jwtPrivateKey = config.get('JWT_PUBLIC_KEY', { infer: true })
        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(jwtPublicKey, 'base64'),
          publicKey: Buffer.from(jwtPrivateKey, 'base64'),
        }
      },
    }),
  ],
  providers: [],
})
export class AuthModule {}
