import { ServiceEntity } from '@/anterprise/entity/service.entity'
import { ServiceRepository } from '@/application/repositories/service.repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export namespace ServiceByCategoryIdProps {
  export interface Request {
    categoryId: string
  }

  export type Response = { service: ServiceEntity }
}

export class ServiceByCategoryId {
  constructor(private readonly serviceRepository: ServiceRepository) {}
  async execute({
    categoryId,
  }: ServiceByCategoryIdProps.Request): Promise<ServiceByCategoryIdProps.Response> {
    const service = await this.serviceRepository.findByCategoryId(categoryId)
    if (!service) {
      throw new ResourceNotFoundError()
    }

    return { service }
  }
}
