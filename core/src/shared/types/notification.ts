import { UniqueEntityUUID } from "../enterprise"


export namespace Notification {
  export interface Props {
    recipientId: UniqueEntityUUID
    title: string
    content: string
    readAt?: Date | null
    createdAt: Date
  }
}