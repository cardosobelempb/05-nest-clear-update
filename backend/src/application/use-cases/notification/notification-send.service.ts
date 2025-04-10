import { NotificationEntity } from '@/anterprise/entity/notification.entity'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'
import { UniqueEntityUUID } from '@core'

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

export class NotificationSendService {
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
