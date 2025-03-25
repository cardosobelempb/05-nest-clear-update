import { NotificationInMemoryRepository } from '@/application/repositories/in-memory/notification-in-memory.repository'

import { NotificationSendService } from '../notification-send.service'

let notificationInMemoryRepository: NotificationInMemoryRepository
let sut: NotificationSendService

describe('NotificationSendService', () => {
  beforeEach(() => {
    notificationInMemoryRepository = new NotificationInMemoryRepository()
    sut = new NotificationSendService(notificationInMemoryRepository)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteúdo da notificação',
    })

    expect(result.isRight()).toBe(true)
    expect(notificationInMemoryRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
