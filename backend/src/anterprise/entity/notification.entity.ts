import { Entity, Optional, UniqueEntityUUID } from '@core'

export namespace NotificationProps {
  export interface Props {
    recipientId: UniqueEntityUUID
    title: string
    content: string
    readAt?: Date | null
    createdAt: Date
  }
  export interface Id {
    notificationId: string
  }
}

export class NotificationEntity extends Entity<NotificationProps.Props> {
  get recipientId() {
    return this.props.recipientId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get readAt() {
    return this.props.readAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  read() {
    this.props.readAt = new Date()
  }

  static create(
    props: Optional<NotificationProps.Props, 'createdAt'>,
    id?: UniqueEntityUUID,
  ) {
    const notification = new NotificationEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }
}
