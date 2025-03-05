import { AvailableTimeInMemoryRepository } from '@/modules/application/repositories/in-memory/available-time-in-memory.repository'

import { AvailableTimeCreatedUseCase } from '../available-time-created.usercase'

let availableTimeInMemoryRepository: AvailableTimeInMemoryRepository
let sut: AvailableTimeCreatedUseCase

describe('AvailableTimeCreateUseCase', () => {

  beforeAll(() => {
    availableTimeInMemoryRepository = new AvailableTimeInMemoryRepository()

    sut = new AvailableTimeCreatedUseCase(
      availableTimeInMemoryRepository,
    )
  })

  it('should be ble create a available time', async () => {

    const result = await sut.execute({
      userId: '1',
      name: '07:00',
    })

    expect(result.value).toBeTruthy()
    // expect(availableTimeInMemoryRepository.items[0].id).toEqual(result.value)
  })
})
