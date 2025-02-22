import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { JwtGuard } from 'src/shared/infra/guards/jwt/jwt.guard'
import { JwtPayloadInfer } from 'src/shared/infra/guards/jwt/jwt.strategy'
import { UserInLoggaed } from 'src/shared/infra/guards/jwt/user-in-logged.decorator'
import { ZodValidationPipe } from 'src/shared/infra/pipes/zod-validation.pipe'
import { z } from 'zod'

export namespace AppointmentFindManyProps {
  const params = z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1))

  export type Request = z.infer<typeof params>

  export const request = new ZodValidationPipe(params)

  export interface Response {}
}

@Controller('/appointments')
@UseGuards(JwtGuard)
export class AppointmentFindManyController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Query('page', AppointmentFindManyProps.request)
    page: AppointmentFindManyProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const perPage = 20
    const appontments = await this.prisma.appontment.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { appontments }
  }
}
