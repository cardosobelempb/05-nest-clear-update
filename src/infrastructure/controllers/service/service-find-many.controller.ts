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

export namespace ServiceFindManyProps {
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

@Controller('/services')
@UseGuards(JwtGuard)
export class ServiceFindManyController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Query('page', ServiceFindManyProps.request)
    page: ServiceFindManyProps.Request,
  ) {
    const perPage = 20
    const services = await this.prisma.service.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { services }
  }
}
