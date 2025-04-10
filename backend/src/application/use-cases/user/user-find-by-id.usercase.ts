import { Either, left, ResourceNotFoundError, right, UserEntity } from '@core'

import { UserRepository } from '../../repositories/user.repository'

export namespace UserFindByIdProps {
  export interface Request {
    userId: string
  }

  export type Response = Either<ResourceNotFoundError, { user: UserEntity }>
}

export class UserFindByIdUseCase {
  constructor(private readonly userRespository: UserRepository) {}

  async execute(userId: string): Promise<UserFindByIdProps.Response> {
    const user = await this.userRespository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== user.id.toString()) {
      return left(new ResourceNotFoundError())
    }

    return right({ user })
  }
}
