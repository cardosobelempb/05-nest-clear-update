import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

import { AvailableTimeRepository } from '../../repositories/available-time.repository'

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
    private readonly availableTimeRespository: AvailableTimeRepository,
  ) {}

  async execute({
    page,
    linesPerPage,
  }: Pagination.Params): Promise<AvailableTimeManyProps.Response> {
    const availableTimes = await this.availableTimeRespository.findMany({
      page,
      linesPerPage,
    })

    return right({
      availableTimes,
    })
  }
}
