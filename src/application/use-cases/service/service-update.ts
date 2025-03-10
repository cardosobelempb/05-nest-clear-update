import { CategoryRepository } from '@/application/repositories/category.repository'
import { ServiceRepository } from '@/application/repositories/service.repository'
import { UserRepository } from '@/application/repositories/user.repository'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace ServiceUpdateProps {
  export interface Request {
    serviceId: string
    categoryId: string
    name: string
    userId: string
  }

  export type Response = {}
}

export class ServiceUpdate {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly serviceRespository: ServiceRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({
    serviceId,
    categoryId,
    name,
    userId,
  }: ServiceUpdateProps.Request) {
    const user = await this.userRepository.findById(userId)

    const service = await this.serviceRespository.findById(serviceId)

    const category = await this.categoryRepository.findById(categoryId)

    if (!user || !service || !category) {
      throw new ResourceNotFoundErro()
    }

    if (
      userId !== user.id.toString() ||
      userId !== service.userId.toString() ||
      userId !== category.userId.toString()
    ) {
      throw new NotAllowedErro()
    }

    service.name = name
    service.categoryId = new UniqueEntityUUID(categoryId)

    await this.serviceRespository.update(service)

    return {}
  }
}
