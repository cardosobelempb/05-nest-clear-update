import { ServiceRepository } from '@/application/repositories/service.repository'
import { Either, left, ResourceNotFoundError, right, ServiceEntity } from '@core'

export namespace ServiceFindByIdServiceProps {
  export interface Request {
    categoryId: string
  }

  export type Response = Either<ResourceNotFoundError, { service: ServiceEntity }>
}

export class ServiceFindByIdService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(serviceId: string): Promise<ServiceFindByIdServiceProps.Response> {
    const service = await this.serviceRepository.findById(serviceId)

    if (!service) {
      return left(new ResourceNotFoundError())
    }

    if (serviceId !== service.id.toString()) {
      return left(new ResourceNotFoundError())
    }

    return right({ service })
  }
}
