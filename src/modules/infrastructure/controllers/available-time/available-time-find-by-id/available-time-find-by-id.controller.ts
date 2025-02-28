import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { AvailableTimeFindByIdUseCase } from '@/modules/application/use-cases/available-time/find-by-id/available-time-find-by-id.usercase'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import {
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
    entity: AvailableTimeEntity
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
  ) {
    const availableTimeEntity = await this.availableTimeFindByIdUseCase.execute(
      { availableTimeId },
    )

    return { availableTimeEntity }
  }
}
