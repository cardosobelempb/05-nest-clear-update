import { Entity } from "../../shared/enterprise/entities/entity"
import { UniqueEntityUUID } from "../../shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid"
import { Optional } from "../../shared/enterprise/types/optional"
import { Notification } from "../../shared/types/notification"




export class NotificationEntity extends Entity<Notification.Props> {
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
    props: Optional<Notification.Props, 'createdAt'>,
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
