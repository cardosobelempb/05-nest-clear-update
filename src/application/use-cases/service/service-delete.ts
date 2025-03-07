import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'

import { ServiceRepository } from '../../repositories/service.repository'

export namespace ServiceDeleteProps {
  export interface Request {
    userId: string
    serviceId: string
  }

  export type Response = {}
}

export class ServiceDelete {
  constructor(private readonly serviceRespository: ServiceRepository) {}

  async execute({ userId, serviceId }: ServiceDeleteProps.Request) {
    const service = await this.serviceRespository.findById(serviceId)

    if (!service) {
      throw new ResourceNotFoundErro()
    }

    if (userId !== service.userId.toString()) {
      throw new NotAllowedErro()
    }

    await this.serviceRespository.delete(service)

    return {}
  }
}
