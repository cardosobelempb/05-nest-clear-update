import { AppointmentTimeCreatedUseCase } from '@/modules/application/use-cases/appointment-time/created/appointment-time-created.usercase'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
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

export namespace AppointmentTimeProps {
  export const request = z.object({
    name: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/times')
@UseGuards(JwtGuard)
export class AppointmentTimeCreateController {
  constructor(
    private readonly appointmetTimeCreatedUseCase: AppointmentTimeCreatedUseCase,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: AppointmentTimeProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { name } = body

    // const appointmentTime = await this.prisma.appointmentTime.findFirst({
    //   where: {
    //     name,
    //   },
    // })

    // if (appointmentTime) {
    //   throw new ConflictException('Time with name already exists.')
    // }

    // const data: Prisma.AppointmentTimeUncheckedCreateInput = {
    //   name,
    //   userId: user.sub,
    // }
    // await this.appointmetTimeCreatedUseCase.execute(name)
  }
}
