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

export namespace AppointmentCategoryProps {
  export const request = z.object({
    name: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/categories')
@UseGuards(JwtGuard)
export class AppointmentCategoryCreateController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: AppointmentCategoryProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { name } = body

    const category = await this.prisma.appointmentCategory.findFirst({
      where: {
        name,
      },
    })

    if (category) {
      throw new ConflictException('Category with name already exists.')
    }

    const data: Prisma.AppointmentCategoryUncheckedCreateInput = {
      name,
      userId: user.sub,
    }
    await this.prisma.appointmentCategory.create({
      data,
    })
  }
}
