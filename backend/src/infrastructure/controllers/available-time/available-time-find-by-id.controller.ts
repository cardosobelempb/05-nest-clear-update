import { AvailableTimeFindByIdUseCase } from '@/application/use-cases/available-time/available-time-find-by-id.usercase'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { AvailableTimePresenter } from '@core'
import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { z } from 'zod'

export namespace AvailableTimeFindByIdProps {
  export const params = z.string().optional().default('')

  export type Request = z.infer<typeof params>

    export const request = new ZodValidationPipe(params)


  export type Response = {
    availableTime: AvailableTimePresenter
  }
}

@Controller('/available-times/:availableTimeId')
export class AvailableTimeFindByIdController {
  constructor(
    private readonly availableTimeFindByIdUseCase: AvailableTimeFindByIdUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Param('availableTimeId', AvailableTimeFindByIdProps.params)
    availableTimeId : AvailableTimeFindByIdProps.Request,
  ): Promise<AvailableTimeFindByIdProps.Response> {
    const result = await this.availableTimeFindByIdUseCase.execute(
      {availableTimeId},
    )

    if (result.isLeft()) {
     throw new BadRequestException()
    }

    const availableTime = AvailableTimePresenter.toHTTP(result.value.availableTime)

    return {
      availableTime
    }
  }
}
