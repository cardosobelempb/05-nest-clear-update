import { Entity } from "../../shared/enterprise"
import { UniqueEntityUUID } from "../../shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid"
import { Service } from "../../shared/types"

export class ServiceAttachmentEntity extends Entity<Service.Attachment> {
  get serviceId() {
    return this.props.serviceId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(
    props: 
      Service.Attachment
    ,
    id?: UniqueEntityUUID,
  ) {
    const serviceAttachment = new ServiceAttachmentEntity(
      {
        ...props,
      },
      id,
    )

    return serviceAttachment
  }
}
