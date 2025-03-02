import { UserAlreadyExistsError } from '@/modules/application/use-cases/errors/user-already-exists.error'
import { UserSignupUseCase } from '@/modules/application/use-cases/user/user-signup.usecase'
import { Public } from '@/shared/infrastructure/guards/jwt/public'
import { ZodValidationPipe } from '@/shared/infrastructure/pipes/zod-validation.pipe'
import { BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'

export namespace UserSignUpProps {
  export const request = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/signup')
@Public()
export class UserSignUpController {
  constructor(private readonly userSignupUseCase: UserSignupUseCase) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UsePipes(new ZodValidationPipe(UserSignUpProps.request))
  async handle(@Body() body: UserSignUpProps.Request) {
    const { name, phone, email, password } = body

    const result = await this.userSignupUseCase.execute({
      name,
      email,
      password,
      phone
    })

     if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
