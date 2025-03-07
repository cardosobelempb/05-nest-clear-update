import { NotificationEntity } from '@/anterprise/entity/notification.entity'
import {
  Either,
  left,
  right,
} from '@/shared/infrastructure/handle-erros/either'
import { NotificationRepository } from '../../repositories/notifications-repository'
import { NotAllowedError } from '../errors/not-allowed-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export namespace NotificationReadProps {
  export interface Request {
    recipientId: string
    notificationId: string
  }

  export type Response = Either<
    ResourceNotFoundError | NotAllowedError,
    {
      notification: NotificationEntity
    }
  >
}

export class NotificationRead {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: NotificationReadProps.Request): Promise<NotificationReadProps.Response> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationRepository.update(notification)

    return right({ notification })
  }
}
