import { notificationFactory } from '@/application/repositories/in-memory/factories/notification.factory'
import { NotificationInMemoryRepository } from '@/application/repositories/in-memory/notification-in-memory.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { NotificationRead } from '../notification-read'

let notificationInMemoryRepository: NotificationInMemoryRepository
let sut: NotificationRead

describe('NotificationRead', () => {
  beforeEach(() => {
    notificationInMemoryRepository = new NotificationInMemoryRepository()
    sut = new NotificationRead(notificationInMemoryRepository)
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
      recipientId: new UniqueEntityUUID('recipient-1'),
    })

    notificationInMemoryRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
