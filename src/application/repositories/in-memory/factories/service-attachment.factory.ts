import {
  ServiceAttachmentEntity,
  ServiceAttachmentProps,
} from '@/anterprise/entity/service-attachment.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function serviceAttachmentFactory(
  override: Partial<ServiceAttachmentProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const serviceAttachment = ServiceAttachmentEntity.create(
    {
      name: faker.commerce.productName(),
      link: faker.internet.url(),
      serviceId: new UniqueEntityUUID(),
      attachmentId: new UniqueEntityUUID(),
      ...override,
    },
    id,
  )

  return serviceAttachment
}
