import { notificationFactory } from '@/application/repositories/in-memory/factories/notification.factory'
import { NotificationInMemoryRepository } from '@/application/repositories/in-memory/notification-in-memory.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { NotificationReadService } from '../notification-read.service'

let notificationInMemoryRepository: NotificationInMemoryRepository
let sut: NotificationReadService

describe('NotificationReadService', () => {
  beforeEach(() => {
    notificationInMemoryRepository = new NotificationInMemoryRepository()
    sut = new NotificationReadService(notificationInMemoryRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = notificationFactory()

    notificationInMemoryRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(notificationInMemoryRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = notificationFactory({
      recipientId: new UniqueEntityUUID('recipient-01'),
    })

    notificationInMemoryRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient-02',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
