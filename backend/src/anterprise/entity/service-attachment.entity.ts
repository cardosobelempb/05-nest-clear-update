import { Optional, UniqueEntityUUID } from '@core'

import { AttachmentEntity, AttachmentProps } from './attachment.entity'

export namespace ServiceAttachmentProps {
  export interface Props extends AttachmentProps.Props {
    serviceId: UniqueEntityUUID
    attachmentId: UniqueEntityUUID
  }
}
export class ServiceAttachmentEntity extends AttachmentEntity<ServiceAttachmentProps.Props> {
  get serviceId() {
    return this.props.serviceId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(
    props: Optional<
      ServiceAttachmentProps.Props,
      'createdAt' | 'isActive' | 'updatedAt' | 'name' | 'link'
    >,
    id?: UniqueEntityUUID,
  ) {
    const serviceAttachment = new ServiceAttachmentEntity(
      {
        ...props,
        name: props.name ?? '',
        link: props.link ?? '',
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return serviceAttachment
  }
}
