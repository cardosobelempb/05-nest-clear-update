import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { User, Appontment, Prisma } from '@prisma/client'

@Controller('/times')
export class TimeCreateController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle() {
    const data: Prisma.TimeUncheckedCreateInput = {
      name: '07:00',
      userId: 'd89bc3a9-a559-45f3-bae8-12e556fcf5e5',
    }
    await this.prisma.time.create({
      data,
    })
  }
}
