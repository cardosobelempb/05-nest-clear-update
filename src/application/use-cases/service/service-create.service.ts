import { ServiceEntity } from '@/anterprise/entity/service.entity'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

import { ServiceAttachmentEntity } from '@/anterprise/entity/service-attachment.entity'
import { ServiceRepository } from '../../repositories/service.repository'
import { ServiceAttachmentListEntity } from '@/anterprise/entity/service-attachment-list.entity'

export namespace ServiceCreateProps {
  export interface Request {
    userId: string
    name: string
    duration: string
    price: number
    categoryId: string
    attachmentsIds: string[]
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
}

export class ServiceCreateService {
  constructor(private readonly serviceRespository: ServiceRepository) {}

  async execute({
    name,
    price,
    duration,
    userId,
    categoryId,
    attachmentsIds,
  }: ServiceCreateProps.Request): Promise<ServiceCreateProps.Response> {
    const service = ServiceEntity.create({
      name,
      price,
      duration,
      userId: new UniqueEntityUUID(userId),
      categoryId: new UniqueEntityUUID(categoryId),
    })

    const serviceAttachments = attachmentsIds.map(id => {
      return ServiceAttachmentEntity.create({
        attachmentId: new UniqueEntityUUID(id),
        serviceId: service.id,
      })
    })

    service.attachments = new ServiceAttachmentListEntity(serviceAttachments)

    await this.serviceRespository.create(service)

    return right({})
  }
}
