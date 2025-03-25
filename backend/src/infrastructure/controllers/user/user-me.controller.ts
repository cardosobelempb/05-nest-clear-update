import { UserMeService } from '@/application/use-cases/user/user-me.service'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { BadRequestException, Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { z } from 'zod'

import { UserPresenter } from '../../presenters/user.presenter'

export namespace UserMeProps {
  const params = z.string().optional().default('')

  export type Request = {
    userId: JwtPayloadInfer
  }

  export const request = new ZodValidationPipe(params)

  export type Response = {
    user: UserPresenter
  }
}

@Controller('/profile/user')
export class UserMeController {
  constructor(private readonly userMeService: UserMeService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @UserInLoggaed() {sub}: JwtPayloadInfer
  ) {
    const result = await this.userMeService.execute(sub)

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const user = UserPresenter.toHTTP(result.value.user)

    return {
      user,
    }
  }
}
