
import { AvailableTimeCreatedUseCase } from '@/modules/application/use-cases/available-time/available-time-created.usercase'
import { AvailableTimeNameAlreadyExistsError } from '@/modules/application/use-cases/errors/available-time-name-already-exists.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

export namespace AvailableTimeProps {
  export const request = z.object({
    name: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/available-times')
export class AvailableTimeCreateController {
  constructor(
    private readonly availableTimeCreatedUseCase: AvailableTimeCreatedUseCase,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: AvailableTimeProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { name } = body

    const result = await this.availableTimeCreatedUseCase.execute({
      name,
      userId: new UniqueEntityUUID(user.sub),
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
  }
}
