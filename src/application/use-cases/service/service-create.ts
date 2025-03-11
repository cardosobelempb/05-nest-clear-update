import { ServiceEntity } from '@/anterprise/entity/service.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import {
  Either,
  left,
  right,
} from '@/shared/infrastructure/handle-erros/either'

import { ServiceRepository } from '../../repositories/service.repository'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { CategoryRepository } from '@/application/repositories/category.repository'

export namespace ServiceCreateProps {
  export interface Request {
    userId: string
    name: string
    duration: string
    price: number
    categoryId: string
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
}

export class ServiceCreate {
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
    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== category.userId.toString()) {
      return left(new NotAllowedError())
    }

    const service = ServiceEntity.create({
      name,
      price,
      duration,
      userId: new UniqueEntityUUID(userId),
      categoryId: category.id,
    })

    await this.serviceRespository.create(service)

    return right({})
  }
}
