import { AvailableTimeFindByIdUseCase } from '@/application/use-cases/available-time/available-time-find-by-id.usercase'
import { AvailableTimeNameAlreadyExistsError } from '@/application/use-cases/errors/available-time-name-already-exists.error'
import { AvailableTimePresenter } from '@/infrastructure/presenters/available-time.presenter'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

export namespace AvailableTimeFindByIdProps {
  const schema = z.object({
    availableTimeId: z.string().uuid('Error 404 Not Found id doesn’t exist'),
  })

  export const request = new ZodValidationPipe(schema)

  export type Request = z.infer<typeof schema>

  export interface Response {
    availableTime: AvailableTimePresenter
  }
}

@Controller('/available-times/:availableTimeId')
@UseGuards(JwtGuard)
export class AvailableTimeFindByIdController {
  constructor(
    private readonly availableTimeFindByIdUseCase: AvailableTimeFindByIdUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Param(AvailableTimeFindByIdProps.request)
    { availableTimeId }: AvailableTimeFindByIdProps.Request,
  ): Promise<AvailableTimeFindByIdProps.Response> {
    const result = await this.availableTimeFindByIdUseCase.execute({
      availableTimeId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AvailableTimeNameAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      availableTime: AvailableTimePresenter.toHTTP(result.value.availableTime),
    }
  }
}
