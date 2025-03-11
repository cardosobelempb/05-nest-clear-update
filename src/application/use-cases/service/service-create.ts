import { ServiceEntity } from '@/anterprise/entity/service.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

import { ServiceRepository } from '../../repositories/service.repository'

export namespace ServiceCreateProps {
  export interface Request {
    name: string
    duration: string
    price: number
    userId: string
    categoryId: string
  }

  export type Response = Either<null, {
    service: ServiceEntity
  }>
}

export class ServiceCreate {
  constructor(private readonly serviceRespository: ServiceRepository) {}

  async execute({
    name,
    price,
    duration,
    userId,
    categoryId,
  }: ServiceCreateProps.Request): Promise<ServiceCreateProps.Response> {
    const service = ServiceEntity.create({
      name,
      price,
      duration,
      userId: new UniqueEntityUUID(userId),
      categoryId: new UniqueEntityUUID(categoryId),
    })

    await this.serviceRespository.create(service)

    return right({
      service,
    })
  }
}
