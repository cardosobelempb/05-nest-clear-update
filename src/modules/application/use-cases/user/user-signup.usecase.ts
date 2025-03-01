import { UserEntity } from '@/modules/anterprise/entity/user.entity'
import { HashGenerator } from '@/shared/application/cryptography/hash-generator'
import {
  Either,
  left,
  right,
} from '@/shared/infrastructure/handle-erros/either'
import { UserPrismaRepository } from '../../repositories/prisma/user-prisma.repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'

export namespace UserCreatedProps {
  export interface Request {
    name: string
    email: string
    password: string
    phone: string
  }

  export type Response = Either<
    UserAlreadyExistsError,
    {
      user: UserEntity
    }
  >
}
export class UserCreatedUseCase {
  constructor(
    private readonly userPrismaRespository: UserPrismaRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: UserCreatedProps.Request): Promise<UserCreatedProps.Response> {
    const userWithSameEmail =
      await this.userPrismaRespository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    const hashdPassword = await this.hashGenerator.hash(password)

    const user = UserEntity.create({
      name,
      email,
      password: hashdPassword,
      phone,
    })

    this.userPrismaRespository.create(user)

    return right({
      user,
    })
  }
}
