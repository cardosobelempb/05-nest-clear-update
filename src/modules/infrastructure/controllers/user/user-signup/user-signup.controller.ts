import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common'

import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { hash } from 'bcryptjs'
import { z } from 'zod'

export namespace UserSignUpProps {
  export const request = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/signup')
export class UserSignUpController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UsePipes(new ZodValidationPipe(UserSignUpProps.request))
  async handle(@Body() body: UserSignUpProps.Request) {
    const { name, phone, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User with e-amil address already exists.')
    }

    const hashedPassword = await hash(password, 8)

    const data = {
      name,
      email,
      password: hashedPassword,
      phone,
    }
    await this.prisma.user.create({
      data,
    })
  }
}
