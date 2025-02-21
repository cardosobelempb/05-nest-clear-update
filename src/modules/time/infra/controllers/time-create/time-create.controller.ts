import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { JwtGuard } from 'src/shared/infra/guards/jwt/jwt.guard'

@Controller('/times')
@UseGuards(JwtGuard)
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
