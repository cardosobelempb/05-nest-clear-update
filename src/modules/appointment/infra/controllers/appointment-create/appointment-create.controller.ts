import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { JwtGuard } from 'src/shared/infra/guards/jwt/jwt.guard'
import { JwtPayloadInfer } from 'src/shared/infra/guards/jwt/jwt.strategy'
import { UserInLoggaed } from 'src/shared/infra/guards/jwt/user-in-logged.decorator'
import { z } from 'zod'

export namespace AppointmentProps {
  export const request = z.object({
    time_id: z.string(),
    service_id: z.string(),
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
    console.log('User => ', user.sub)
    const { service_id, time_id } = body

    const data: Prisma.AppontmentUncheckedCreateInput = {
      serviceId: service_id,
      timeId: time_id,
      userId: user.sub,
    }

    console.log(data)
    await this.prisma.appontment.create({
      data,
    })
  }
}
