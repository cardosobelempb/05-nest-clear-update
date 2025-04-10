import { ServiceManyService } from '@/application/use-cases/service/service-many.service'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { right } from '@core'
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common'
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

  export type Response = {}
}

@Controller('/services')
export class ServiceFindManyController {
  constructor(private readonly serviceManyService: ServiceManyService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Query('page', ServiceFindManyProps.request)
    page: ServiceFindManyProps.Request,
  ) {
    const linesPerPage = 20
    const services = await this.serviceManyService.execute({
      page,
      linesPerPage,
    })
    return right({ services })
  }
}
