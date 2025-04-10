import { UserFindByIdUseCase } from '@/application/use-cases/user/user-find-by-id.usercase'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { UserPresenter } from '@core'
import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common'
import { z } from 'zod'

export namespace UserFindByIdProps {
  const params = z.string().optional().default('')

  export type Request = z.infer<typeof params>

  export const request = new ZodValidationPipe(params)

  export type Response = {
    user: UserPresenter
  }
}

@Controller('/users/:userId')
@UseGuards(JwtGuard)
export class UserFindByIdController {
  constructor(private readonly userFindByIdUseCase: UserFindByIdUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Param('userId', UserFindByIdProps.request)
    userId: UserFindByIdProps.Request,
  ): Promise<UserFindByIdProps.Response> {
    const result = await this.userFindByIdUseCase.execute(userId)

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const user = UserPresenter.toHTTP(result.value.user)

    return {
      user,
    }
  }
}
