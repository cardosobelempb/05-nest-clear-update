import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'
import { JwtGuard } from '@/shared/infra/guards/jwt/jwt.guard'
import { JwtPayloadInfer } from '@/shared/infra/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infra/guards/jwt/user-in-logged.decorator'
import { z } from 'zod'

export namespace AppointmentProps {
  export const request = z.object({
    appointmentServiceId: z.string(),
    appointmentTimeId: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/appointments')
@UseGuards(JwtGuard)
export class AppointmentCreateController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: AppointmentProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { appointmentServiceId, appointmentTimeId } = body

    const data: Prisma.AppontmentUncheckedCreateInput = {
      appointmentServiceId,
      appointmentTimeId,
      userId: user.sub,
    }

    console.log(data)
    await this.prisma.appontment.create({
      data,
    })
  }
}
