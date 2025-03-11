import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import {
  Either,
  left,
  right,
} from '@/shared/infrastructure/handle-erros/either'

import { ServiceRepository } from '../../repositories/service.repository'

export namespace ServiceDeleteProps {
  export interface Request {
    userId: string
    serviceId: string
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
}

export class ServiceDelete {
  constructor(private readonly serviceRespository: ServiceRepository) {}

  async execute({ userId, serviceId }: ServiceDeleteProps.Request) {
    const service = await this.serviceRespository.findById(serviceId)

    if (!service) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== service.userId.toString()) {
      return left(new NotAllowedError())
    }

    await this.serviceRespository.delete(service)

    return right({})
  }
}
