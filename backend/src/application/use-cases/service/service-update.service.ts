import { ServiceAttachmentListEntity } from '@/anterprise/entity/service-attachment-list.entity'
import { ServiceAttachmentEntity } from '@/anterprise/entity/service-attachment.entity'
import { CategoryRepository } from '@/application/repositories/category.repository'
import { ServiceAttachmentRepository } from '@/application/repositories/service-attachment.repository'
import { ServiceRepository } from '@/application/repositories/service.repository'
import { Either, left, NotAllowedError, ResourceNotFoundError, right, UniqueEntityUUID } from '@core'

export namespace ServiceUpdateProps {
  export interface Request {
    serviceId: string
    categoryId: string
    name: string
    price: number,
    duration: string,
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
    duration,
    price
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
    service.price = price
    service.duration = duration
    service.categoryId = new UniqueEntityUUID(categoryId)
    service.attachments = serviceAttachmentList

    await this.serviceRespository.update(service)

    return right({})
  }
}
