import { AvailableTimeManyUseCase } from '@/modules/application/use-cases/available-time/many/available-time-many.usercase'
import { AvailableTimePresenter } from '@/modules/infrastructure/presenters/available-time.presenter'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

export namespace AvailableTimeFindManyProps {
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

@Controller('/available-times')
@UseGuards(JwtGuard)
export class AvailableTimeFindManyController {
  constructor(
    private readonly availableTimeManyUseCase: AvailableTimeManyUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Query('page', AvailableTimeFindManyProps.request)
    page: AvailableTimeFindManyProps.Request,
    @Query('perPage', AvailableTimeFindManyProps.request)
    perPage: AvailableTimeFindManyProps.Request,
  ) {
    const result = await this.availableTimeManyUseCase.execute({
      page,
      perPage,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const availableTimes = result.value.availableTimes

    return { availableTimes: availableTimes.map(AvailableTimePresenter.toHTTP) }
  }
}
