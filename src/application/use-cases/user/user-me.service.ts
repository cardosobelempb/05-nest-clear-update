import { UserEntity } from '@/anterprise/entity/user.entity'
import { UserRepository } from '@/application/repositories/user.repository'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

import { UserAlreadyExistsError } from '../errors/user-already-exists.error'

export namespace UserMeProps {
  export interface Request {
    userId: string
  }

  export type Response = Either<
    UserAlreadyExistsError,
    {
      user: UserEntity
    }
  >

}
export class UserMeService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(
    userId: string
  ): Promise<UserMeProps.Response> {

    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new UserAlreadyExistsError(userId))
    }

    return right({
      user,
    })

  }
}
