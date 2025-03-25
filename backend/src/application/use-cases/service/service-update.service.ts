import { ServiceAttachmentListEntity } from '@/anterprise/entity/service-attachment-list.entity'
import { ServiceAttachmentEntity } from '@/anterprise/entity/service-attachment.entity'
import { CategoryRepository } from '@/application/repositories/category.repository'
import { ServiceAttachmentRepository } from '@/application/repositories/service-attachment.repository'
import { ServiceRepository } from '@/application/repositories/service.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import {
  Either,
  left,
  right,
} from '@/shared/infrastructure/handle-erros/either'

export namespace ServiceUpdateProps {
  export interface Request {
    serviceId: string
    categoryId: string
    name: string
    userId: string
    attachmentsIds: string[]
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
}

export class ServiceUpdateService {
  constructor(
    private readonly serviceAttachmentRepository: ServiceAttachmentRepository,
    private readonly serviceRespository: ServiceRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({
    serviceId,
    categoryId,
    name,
    userId,
    attachmentsIds,
  }: ServiceUpdateProps.Request) {
    const service = await this.serviceRespository.findById(serviceId)
    const category = await this.categoryRepository.findById(categoryId)

    if (!service || !category) {
      return left(new ResourceNotFoundError())
    }

    if (
      userId !== service.userId.toString() ||
      userId !== category.userId.toString()
    ) {
      return left(new NotAllowedError())
    }

    const currentServiceAttachments =
      await this.serviceAttachmentRepository.findManyByServiceId(serviceId)

    const serviceAttachmentList = new ServiceAttachmentListEntity(
      currentServiceAttachments,
    )

    const serviceAttachments = attachmentsIds.map(id => {
      return ServiceAttachmentEntity.create({
        attachmentId: new UniqueEntityUUID(id),
        serviceId: service.id,
      })
    })

    serviceAttachmentList.update(serviceAttachments)

    service.name = name
    service.categoryId = new UniqueEntityUUID(categoryId)
    service.attachments = serviceAttachmentList

    await this.serviceRespository.update(service)

    return right({})
  }
}
