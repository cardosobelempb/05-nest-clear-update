import { AvailableTimeInMemoryRepository } from '@/application/repositories/in-memory/available-time-in-memory.repository'
import { availabletimeFactory } from '@/application/repositories/in-memory/factories/available-time.factory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { AvailableTimeDelete } from '../available-time-delete'

let availableTimeInMemoryRepository: AvailableTimeInMemoryRepository
let sut: AvailableTimeDelete

describe('AvailableTimeDelete', () => {
  beforeAll(() => {
    availableTimeInMemoryRepository = new AvailableTimeInMemoryRepository()
    sut = new AvailableTimeDelete(availableTimeInMemoryRepository)
  })

  it('should not ble to delete a available time from user', async () => {
    const newAvailableTime = availabletimeFactory(
      {
        userId: new UniqueEntityUUID('user-1'),
      },
      new UniqueEntityUUID('availabletime-1'),
    )

    await availableTimeInMemoryRepository.create(newAvailableTime)

    await sut.execute({
      availabletimeId: 'availabletime-1',
      userId: 'user-1',
    })

    expect(availableTimeInMemoryRepository.items).toHaveLength(0)
  })

  // it('should be ble to delete a available time', async () => {
  //   const newAvailableTime = availabletimeFactory(
  //     {
  //       userId: new UniqueEntityUUID('user-1'),
  //     },
  //     new UniqueEntityUUID('availabletime-1'),
  //   )

  //   await availableTimeInMemoryRepository.create(newAvailableTime)

  //   expect(() => {
  //     return sut.execute({
  //       availabletimeId: 'availabletime-1',
  //       userId: 'user-2',
  //     })
  //   }).rejects.toBeInstanceOf(NotAllowedErro)
  // })
})
