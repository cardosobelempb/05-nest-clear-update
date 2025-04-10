import { ServiceFindByIdService } from '@/application/use-cases/service/service-find-by-id.service'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { ServicePresenter } from '@core'
import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { z } from 'zod'

export namespace ServiceFindByIdProps {
  export const params = z.string().optional().default('')

  export type Request = z.infer<typeof params>

  export const request = new ZodValidationPipe(params)

  export type Response = {
    service: ServicePresenter
  }
}

@Controller('/services/:serviceId')
export class ServiceFindByIdController {
  constructor(
    private readonly serviceFindByIdService: ServiceFindByIdService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Param('serviceId', ServiceFindByIdProps.request)
    serviceId : ServiceFindByIdProps.Request,
  ): Promise<ServiceFindByIdProps.Response> {
    const result = await this.serviceFindByIdService.execute(serviceId)

    if (result.isLeft()) {
      const error = result.value as Error
      throw new BadRequestException(error.message)
    }

    return {
      service: ServicePresenter.toHTTP(result.value.service),
    }
  }
}
