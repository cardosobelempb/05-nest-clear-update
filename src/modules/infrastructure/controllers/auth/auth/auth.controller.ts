import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'

import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { z } from 'zod'

export namespace AuthProps {
  export const request = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/auth/token')
export class AuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(AuthProps.request))
  @Post()
  async handle(@Body() body: AuthProps.Request) {
    //   const { email, password } = body
    //   const user = await this.prisma.user.findUnique({
    //     where: { email },
    //   })
    //   if (!user) {
    //     throw new UnauthorizedException('User credentials do not match.')
    //   }
    //   const isPasswordValid = await compare(password, user.password)
    //   if (!isPasswordValid) {
    //     throw new UnauthorizedException('User credentials do not match.')
    //   }
    //   const accessToken = this.jwt.sign({
    //     sub: user.id,
    //   })
    //   return { access_token: accessToken }
  }
}
