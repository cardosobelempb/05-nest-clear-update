import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'

@Controller('/services')
export class ServiceCreateController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle() {
    const data: Prisma.ServiceUncheckedCreateInput = {
      name: 'Degradê normal',
      userId: 'd89bc3a9-a559-45f3-bae8-12e556fcf5e5',
    }
    await this.prisma.service.create({
      data,
    })
  }
}
