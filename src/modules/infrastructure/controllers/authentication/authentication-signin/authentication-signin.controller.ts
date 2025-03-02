import { AuthenticationSigninUseCase } from '@/modules/application/use-cases/authentication/signin/authentication-signin.usecase'
import { WrongCredentialsError } from '@/modules/infrastructure/erros/wrong-credentials-error'
import { Public } from '@/shared/infrastructure/guards/jwt/public'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UsePipes } from '@nestjs/common'
import { z } from 'zod'

export namespace AuthProps {
  export const request = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  export type Request = z.infer<typeof request>


  export type Response = {
     access_token: string
  }
}

@Controller('/auth/token')
@Public()
export class AuthenticationSigninController {
  constructor(private readonly authenticationSigninUsecase: AuthenticationSigninUseCase) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(AuthProps.request))
  @Post()
  async handle(@Body() body: AuthProps.Request): Promise<AuthProps.Response> {
    const { email, password } = body

    const result = await this.authenticationSigninUsecase.execute({
      email,
      password
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
