import { UserEntity } from '@/anterprise/entity/user.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

import { UserRepository } from '../../repositories/user.repository'

export namespace UserManyProps {
  export interface Request {
    page: number
  }

  export type Response = Either<
    null,
    {
      users: UserEntity[]
    }
  >
}

export class UserManyUseCase {
  constructor(private readonly userRespository: UserRepository) {}

  async execute({ page }: Pagination.Params): Promise<UserManyProps.Response> {
    const users = await this.userRespository.findMany({
      page,
    })

    return right({
      users,
    })
  }
}
