import { ServiceEntity } from '@/anterprise/entity/service.entity'
import { CategoryRepository } from '@/application/repositories/category.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

import { ServiceRepository } from '../../repositories/service.repository'

export namespace ServiceCreateProps {
  export interface Request {
    userId: UniqueEntityUUID
    name: string
    duration: string
    price: number
    categoryId: UniqueEntityUUID
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
}

export class ServiceCreateService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly serviceRespository: ServiceRepository,
  ) {}

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
      userId,
      categoryId,
    })

    await this.serviceRespository.create(service)

    return right({})
  }
}
