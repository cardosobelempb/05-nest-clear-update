import { AvailableTimeInMemoryRepository } from '@/application/repositories/in-memory/available-time-in-memory.repository'

import { AvailableTimeCreateService } from '../available-time-create.service'

let availableTimeInMemoryRepository: AvailableTimeInMemoryRepository
let sut: AvailableTimeCreateService

describe('AvailableTimeCreateUseCase', () => {
  beforeEach(() => {
    availableTimeInMemoryRepository = new AvailableTimeInMemoryRepository()
    sut = new AvailableTimeCreateService(availableTimeInMemoryRepository)
  })

  it('should be ble create a available time', async () => {
    const result = await sut.execute({
      userId: 'user-1',
      time: 'time name',
    })

    expect(result.isRight()).toBe(true)
    // expect(availableTimeInMemoryRepository.items[0]).toEqual(result.value)
    // expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
