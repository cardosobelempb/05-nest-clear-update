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
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import { z } from 'zod'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'

export namespace AppontmentServiceProps {
  export const request = z.object({
    name: z.string(),
    price: z.number(),
    duration: z.string(),
    availableTimeId: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/services')
@UseGuards(JwtGuard)
export class ServiceCreateController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: AppontmentServiceProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { name, price, duration, availableTimeId } = body

    const Service = await this.prisma.service.findFirst({
      where: {
        name,
      },
    })

    if (Service) {
      throw new ConflictException('Service with name already exists.')
    }

    const availableTime = await this.prisma.availableTime.findUnique({
      where: {
        id: availableTimeId,
      },
    })

    if (!availableTime) {
      throw new ResourceNotFoundErro()
    }

    const data: Prisma.ServiceUncheckedCreateInput = {
      name,
      price,
      userId: user.sub,
      availableTimeId: availableTime.id,
      duration,
    }
    await this.prisma.service.create({
      data,
    })
  }
}
