import { ConflictException, UsePipes } from '@nestjs/common'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'

import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/shared/infra/pipes/zod-validation.pipe'

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

@Controller('/users')
export class UserSignUpController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
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
