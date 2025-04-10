import { ServiceEntity } from '@/anterprise/entity/service.entity'
import { Either, Pagination, right } from '@core'

import { ServiceRepository } from '../../repositories/service.repository'

export namespace ServiceManyProps {
  export interface Request {
    page: number
  }

  export type Response = Either<
    null,
    {
      services: ServiceEntity[]
    }
  >
}

export class ServiceManyService {
  constructor(private readonly serviceRespository: ServiceRepository) {}

  async execute({ page }: Pagination.Params): Promise<ServiceManyProps.Response> {
    const services = await this.serviceRespository.findMany({
      page,
    })

    return right({
      services,
    })
  }
}
