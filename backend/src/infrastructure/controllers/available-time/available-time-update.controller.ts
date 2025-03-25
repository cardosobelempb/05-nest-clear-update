import { AvailableTimeUpdateUseCase } from '@/application/use-cases/available-time/available-time-update.usercase'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

export namespace AvailableTimeUpdateProps {
  export const request = z.object({
    name: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/available-times/:availableTimeId')
export class AvailableTimeUpdateController {
  constructor(
    private readonly availableTimeUpdateUseCase: AvailableTimeUpdateUseCase,
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put()
  async handle(
    @Body() body: AvailableTimeUpdateProps.Request,
    @Param('availableTimeId') availableTimeId: string,
    @UserInLoggaed() user: JwtPayloadInfer,
  ): Promise<void> {
    const { name } = body
    const userId = user.sub

    const result = await this.availableTimeUpdateUseCase.execute({
      name,
      userId,
      availableTimeId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
