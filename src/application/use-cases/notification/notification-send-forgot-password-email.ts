import { UserEntity } from '@/anterprise/entity/user.entity'
import { Either } from '@/shared/infrastructure/handle-erros/either'

import { UserRepository } from '../../repositories/user.repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'

export namespace UserSendForgoPasswordEmailProps {
  export interface Request {
    email: string
  }

  export type Response = Either<
    UserAlreadyExistsError,
    {
      user: UserEntity
    }
  >
}
export class NotificationSendForgotPasswordEmail {
  constructor(private readonly userRespository: UserRepository) {}

  async execute({
    email,
  }: UserSendForgoPasswordEmailProps.Request): Promise<void> {
    // const userWithSameEmail = await this.userRespository.findByEmail(email)
    // if (userWithSameEmail) {
    //   return left(new UserAlreadyExistsError(email))
    // }
    // const hashdPassword = await this.hashGenerator.hash(password)
    // const user = UserEntity.create({
    //   name,
    //   email,
    //   password: hashdPassword,
    //   phone,
    // })
    // await this.userRespository.create(user)
    // return right({
    //   user,
    // })
  }
}
