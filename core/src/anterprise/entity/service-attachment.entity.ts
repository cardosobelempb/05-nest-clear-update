import { Entity, UniqueEntityUUID } from "../../shared/enterprise"
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
