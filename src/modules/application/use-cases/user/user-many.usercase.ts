import { UserEntity } from '@/modules/anterprise/entity/user.entity'
import { UserPrismaRepository } from '@/modules/application/repositories/prisma/user-prisma.repository'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

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
  constructor(
    private readonly userPrismaRespository: UserPrismaRepository,
  ) {}

  async execute({
    page,
  }: Pagination.Params): Promise<UserManyProps.Response> {
    const users = await this.userPrismaRespository.findMany({
      page,
    })

    return right({
      users,
    })
  }
}
