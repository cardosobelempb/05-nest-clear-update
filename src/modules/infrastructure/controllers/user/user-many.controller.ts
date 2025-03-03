import { UserManyUseCase } from '@/modules/application/use-cases/user/user-many.usercase'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { UserPresenter } from '../../presenters/user.presenter'

export namespace UserManyProps {
  const params = z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1))

  export type Request = z.infer<typeof params>

  export const request = new ZodValidationPipe(params)

  export type Response = {
    users: UserPresenter[]
  }
}

@Controller('/users')
@UseGuards(JwtGuard)
export class UserManyController {
  constructor(private readonly userManyUseCase: UserManyUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Query('page', UserManyProps.request)
    page: UserManyProps.Request,
  ): Promise<UserManyProps.Response> {

    const result = await this.userManyUseCase.execute({page})

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const users = result.value?.users.map(UserPresenter.toHTTP)

    return {
      users
    }
  }
}
