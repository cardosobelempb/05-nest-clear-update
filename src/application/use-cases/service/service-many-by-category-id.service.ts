import { ServiceEntity } from '@/anterprise/entity/service.entity'
import { ServiceRepository } from '@/application/repositories/service.repository'

export namespace ServiceManyByCategoryIdProps {
  export interface Request {
    categoryId: string
    page: number
  }

  export type Response = { services: ServiceEntity[] }
}

export class ServiceManyByCategoryId {
  constructor(private readonly serviceRepository: ServiceRepository) {}
  async execute({
    categoryId,
    page,
  }: ServiceManyByCategoryIdProps.Request): Promise<ServiceManyByCategoryIdProps.Response> {
    const services = await this.serviceRepository.findManyByCategoryId(categoryId, {page})


    return { services }
  }
}
