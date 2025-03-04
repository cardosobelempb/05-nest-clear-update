import { AvailableTimeInMemoryRepository } from '@/modules/application/repositories/in-memory/available-time-in-memory.repository'

import { AvailableTimeCreatedUseCase } from '../available-time-created.usercase'

let availableTimeInMemoryRepository: AvailableTimeInMemoryRepository
let availableTimeCreatedUseCase: AvailableTimeCreatedUseCase

describe('AvailableTimeCreateUseCase', () => {

  beforeAll(() => {

  })

  it('should ble create a available time', async () => {

    availableTimeInMemoryRepository = new AvailableTimeInMemoryRepository()

    availableTimeCreatedUseCase = new AvailableTimeCreatedUseCase(
      availableTimeInMemoryRepository,
    )

    const result = await availableTimeCreatedUseCase.execute({
      name: '07:00',
      userId: '',
    })

    expect(result.value).toBeTruthy()
  })
})
