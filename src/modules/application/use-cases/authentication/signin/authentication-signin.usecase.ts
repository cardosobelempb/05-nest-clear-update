import { Controller } from '@nestjs/common'

import { UserPrismaRepository } from '@/modules/application/repositories/prisma/user-prisma.repository'
import { Encrypter } from '@/shared/application/cryptography/encrypter'
import { HashComparer } from '@/shared/application/cryptography/hash-comparer'
import { WrongCreadentialsErro } from '@/shared/application/usecase-erros/wrong-creadentials.error'
import { Either, left } from '@/shared/infrastructure/handle-erros/either'

export namespace AuthenticationSigninProps {
  export interface Request {
    email: string
    password: string
  }

  export type Response = Either<
    WrongCreadentialsErro,
    {
      access_token: string
    }
  >
}

@Controller('/auth/token')
export class AuthenticationSigninControllerUseCase {
  constructor(
    private readonly userPrismaRepository: UserPrismaRepository,
    private readonly hashCompare: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({ email, password }: AuthenticationSigninProps.Request) {
    const user = await this.userPrismaRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCreadentialsErro())
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCreadentialsErro())
    }
    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })
    return { access_token: accessToken }
  }
}
