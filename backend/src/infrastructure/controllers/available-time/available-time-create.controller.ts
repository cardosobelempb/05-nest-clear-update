import { AvailableTimeCreateService } from '@/application/use-cases/available-time/available-time-create.service'
import { AvailableTimeNameAlreadyExistsError } from '@/application/use-cases/errors/available-time-name-already-exists.error'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import { BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { z } from 'zod'

export namespace AvailableTimeProps {
  export const request = z.object({
    time: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/available-times')
export class AvailableTimeCreateController {
  constructor(
    private readonly availableTimeCreatedUseCase: AvailableTimeCreateService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: AvailableTimeProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { time } = body

    const userId = user.sub
    console.log('AvailableTimeCreateController', time, userId)

    const result = await this.availableTimeCreatedUseCase.execute({
      time,
      userId,
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
