import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { z } from 'zod'

export namespace AppointmentTimeFindManyProps {
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

@Controller('/times')
@UseGuards(JwtGuard)
export class AppointmentTimeFindManyController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Query('page', AppointmentTimeFindManyProps.request)
    page: AppointmentTimeFindManyProps.Request,
  ) {
    // const perPage = 20
    // const times = await this.prisma.appointmentTime.findMany({
    //   take: perPage,
    //   skip: (page - 1) * perPage,
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // })
    // return { times }
  }
}
