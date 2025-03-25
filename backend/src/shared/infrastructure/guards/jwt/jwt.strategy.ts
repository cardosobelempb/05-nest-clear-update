import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'
import { EnvService } from '../../env/env.service'

const jwtPayload = z.object({
  sub: z.string().uuid(),
})

export type JwtPayloadInfer = z.infer<typeof jwtPayload>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(envService: EnvService) {
    const publicKey = envService.get(
      'JWT_PUBLIC_KEY',
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
