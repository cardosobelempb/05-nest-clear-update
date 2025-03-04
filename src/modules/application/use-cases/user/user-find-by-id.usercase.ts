import { UserEntity } from '@/modules/anterprise/entity/user.entity'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

import { UserRepository } from '../../repositories/user.repository'

export namespace UserFindByIdProps {
  export interface Request {
    userId: string
  }

  export type Response = Either<
    ResourceNotFoundErro,
    { user: UserEntity }
  >
}

export class UserFindByIdUseCase {
  constructor(
    private readonly userRespository: UserRepository,
  ) {}

  async execute({
    userId,
  }: UserFindByIdProps.Request): Promise<UserFindByIdProps.Response> {
    const user =
      await this.userRespository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundErro())
    }

    return right({ user })
  }
}
