import { ConflictException } from '@nestjs/common'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'

export namespace UserSignUpProps {
  export type Request = {
    name: string
    phone: string
    email: string
    password: string
  }

  export interface Response {}
}

@Controller('/users')
export class UserSignUpController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
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

    const data = {
      name,
      email,
      password,
      phone,
    }
    await this.prisma.user.create({
      data,
    })
  }
}
