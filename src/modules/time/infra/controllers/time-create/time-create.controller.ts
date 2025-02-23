import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.servoce'
import { JwtGuard } from '@/shared/infra/guards/jwt/jwt.guard'
import { JwtPayloadInfer } from '@/shared/infra/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infra/guards/jwt/user-in-logged.decorator'
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

export namespace TimeProps {
  export const request = z.object({
    name: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/times')
@UseGuards(JwtGuard)
export class TimeCreateController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: TimeProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { name } = body

    const time = await this.prisma.time.findFirst({
      where: {
        name,
      },
    })

    if (time) {
      throw new ConflictException('Time with name already exists.')
    }

    const data: Prisma.TimeUncheckedCreateInput = {
      name,
      userId: user.sub,
    }
    await this.prisma.time.create({
      data,
    })
  }
}
