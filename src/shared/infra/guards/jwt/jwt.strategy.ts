import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { EnvType } from '@/shared/env/env'
import { z } from 'zod'

const jwtPayload = z.object({
  sub: z.string().uuid(),
})

export type JwtPayloadInfer = z.infer<typeof jwtPayload>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const publicKey = configService.get<ConfigService<EnvType, true>>(
      'JWT_PUBLIC_KEY',
      { infer: true },
    )

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  async validate(payload: JwtPayloadInfer) {
    return jwtPayload.parse(payload)
  }
}
