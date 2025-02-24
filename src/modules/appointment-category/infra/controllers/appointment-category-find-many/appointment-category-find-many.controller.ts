import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common'
import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'
import { JwtGuard } from '@/shared/infra/guards/jwt/jwt.guard'
import { ZodValidationPipe } from '@/shared/infra/pipes/zod-validation.pipe'
import { z } from 'zod'

export namespace AppointmentCategoryFindManyProps {
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

@Controller('/categories')
@UseGuards(JwtGuard)
export class AppointmentCategoryFindManyController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Query('page', AppointmentCategoryFindManyProps.request)
    page: AppointmentCategoryFindManyProps.Request,
  ) {
    const perPage = 1
    const categorys = await this.prisma.appointmentCategory.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { categorys }
  }
}
