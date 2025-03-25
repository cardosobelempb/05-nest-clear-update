import { UniqueEntityUUID } from "../shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid"

export namespace Notification {
  export interface Props {
    recipientId: UniqueEntityUUID
    title: string
    content: string
    readAt?: Date | null
    createdAt: Date
  }
}