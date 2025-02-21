import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'

@Controller('/appointments')
export class AppointmentCreateController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle() {
    const data: Prisma.AppontmentUncheckedCreateInput = {
      userId: 'd89bc3a9-a559-45f3-bae8-12e556fcf5e5',
      serviceId: 'fed95cb4-4937-42a5-84ce-ce82bf9bca9b',
      timeId: '2ce11851-898d-48fd-9cef-98c6748f524a',
    }
    await this.prisma.appontment.create({
      data,
    })
  }
}
