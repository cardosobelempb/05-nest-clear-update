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
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'

export namespace AppontmentServiceProps {
  export const request = z.object({
    name: z.string(),
    price: z.number(),
    appointmentTimeId: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/services')
@UseGuards(JwtGuard)
export class AppointmentServiceCreateController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: AppontmentServiceProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { name, price, appointmentTimeId } = body

    const appointmentService = await this.prisma.appointmentService.findFirst({
      where: {
        name,
      },
    })

    if (appointmentService) {
      throw new ConflictException('Service with name already exists.')
    }

    const appointmentTime = await this.prisma.appointmentTime.findUnique({
      where: {
        id: appointmentTimeId,
      },
    })

    if (!appointmentTime) {
      throw new ResourceNotFoundErro()
    }

    const data: Prisma.AppointmentServiceUncheckedCreateInput = {
      name,
      price,
      userId: user.sub,
      appointmentTimeId: appointmentTime.id,
    }
    await this.prisma.appointmentService.create({
      data,
    })
  }
}
