import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { AvailablePrismaTimeRepository } from '@/modules/application/repositories/prisma/available-time-prisma.repository'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

export namespace AvailableTimeManyProps {
  export interface Request {
    page: number
  }

  export type Response = Either<
    null,
    {
      availableTimes: AvailableTimeEntity[]
    }
  >
}

export class AvailableTimeManyUseCase {
  constructor(
    private readonly availablePrismaTimeRespository: AvailablePrismaTimeRepository,
  ) {}

  async execute({
    page,
    perPage,
  }: Pagination.Params): Promise<AvailableTimeManyProps.Response> {
    const availableTimes = await this.availablePrismaTimeRespository.findMany({
      page,
      perPage,
    })

    return right({
      availableTimes,
    })
  }
}
