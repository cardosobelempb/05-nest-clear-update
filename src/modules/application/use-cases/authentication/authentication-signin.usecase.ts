import { UserRepository } from '@/modules/application/repositories/user.repository'
import { Encrypter } from '@/shared/application/cryptography/encrypter'
import { HashComparer } from '@/shared/application/cryptography/hash-comparer'
import { WrongCreadentialsErro } from '@/shared/application/usecase-erros/wrong-creadentials.error'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

export namespace AuthenticationSigninProps {
  export interface Request {
    email: string
    password: string
  }

  export type Response = Either<
    WrongCreadentialsErro,
    {
      accessToken: string
    }
  >
}

export class AuthenticationSigninUseCase {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly hashCompare: HashComparer,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ email, password }: AuthenticationSigninProps.Request): Promise<AuthenticationSigninProps.Response> {
    const user = await this.userRepository.findByEmail(email)

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

    return right({ accessToken })
  }
}
