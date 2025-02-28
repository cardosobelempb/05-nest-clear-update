import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { AvailablePrismaTimeRepository } from '@/modules/application/repositories/prisma/available-time-prisma.repository'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export class AvailableTimeManyUseCase {
  constructor(
    private readonly availablePrismaTimeRespository: AvailablePrismaTimeRepository,
  ) {}

  async execute({
    page,
    perPage,
  }: Pagination.Params): Promise<AvailableTimeEntity[]> {
    return await this.availablePrismaTimeRespository.findMany({ page, perPage })
  }
}
