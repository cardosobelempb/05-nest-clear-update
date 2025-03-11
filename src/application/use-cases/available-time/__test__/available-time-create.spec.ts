import { AvailableTimeInMemoryRepository } from '@/application/repositories/in-memory/available-time-in-memory.repository'

import { AvailableTimeCreatedUseCase } from '../available-time-created.usercase'
import { userFactory } from '@/application/repositories/in-memory/factories/user.factory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { UserInMemoryRepository } from '@/application/repositories/in-memory/user-in-memory.repository'

let availableTimeInMemoryRepository: AvailableTimeInMemoryRepository
let userImMemoryRepository: UserInMemoryRepository
let sut: AvailableTimeCreatedUseCase

describe('AvailableTimeCreateUseCase', () => {
  beforeEach(() => {
    availableTimeInMemoryRepository = new AvailableTimeInMemoryRepository()
    sut = new AvailableTimeCreatedUseCase(availableTimeInMemoryRepository)
  })

  it.skip('should be ble create a available time', async () => {
    const result = await sut.execute({
      name: 'time name',
      userId: 'user-1',
    })

    console.log('Result => ', result.value)

    expect(result.isRight()).toBe(true)
    // expect(availableTimeInMemoryRepository.items[0].id).toEqual(result.value)
  })
})
