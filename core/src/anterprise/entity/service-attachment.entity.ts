import { AggregateRoot } from "../../shared/enterprise/entities/aggregate-root"
import { UniqueEntityUUID } from "../../shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid"
import { Optional } from "../../shared/enterprise/types/optional"

import { Service } from '../../types/service'

export class ServiceAttachmentEntity extends AggregateRoot<Service.Attachment> {
  get serviceId() {
    return this.props.serviceId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(
    props: Optional<
      Service.Attachment,
      'createdAt' | 'isActive' | 'updatedAt'
    >,
    id?: UniqueEntityUUID,
  ) {
    const serviceAttachment = new ServiceAttachmentEntity(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return serviceAttachment
  }
}
