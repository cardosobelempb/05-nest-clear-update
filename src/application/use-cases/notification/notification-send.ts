import { NotificationEntity } from '@/anterprise/entity/notification.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'
import { NotificationRepository } from '../../repositories/notifications-repository'

export namespace NotificationSendProps {
  export interface Request {
    recipientId: string
    title: string
    content: string
  }

  export type Response = Either<
    null,
    {
      notification: NotificationEntity
    }
  >
}

export class NotificationSend {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: NotificationSendProps.Request): Promise<NotificationSendProps.Response> {
    const notification = NotificationEntity.create({
      recipientId: new UniqueEntityUUID(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({
      notification,
    })
  }
}
