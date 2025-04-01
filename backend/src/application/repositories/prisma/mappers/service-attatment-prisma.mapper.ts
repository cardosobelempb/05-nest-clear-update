import { ServiceAttachmentEntity, UniqueEntityUUID } from '@core'
import { Attachement as ServiceAttachementMapper } from '@prisma/client'

export class ServiceAttatmentPrismaMapper {
  static toDomain(raw: ServiceAttachementMapper): ServiceAttachmentEntity {
    if (!raw.serviceId) {
      throw new Error('Invalid attachement type')
    }
    return ServiceAttachmentEntity.create(
      {
        attachmentId: new UniqueEntityUUID(raw.id),
        serviceId: new UniqueEntityUUID(raw.serviceId),
      },
      new UniqueEntityUUID(raw.id),
    )
  }
}
