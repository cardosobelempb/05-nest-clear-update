import { CategoryInMemoryRepository } from '@/application/repositories/in-memory/category-in-memory.repository'
import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'

import { ServiceCreateService } from '../service-create.service'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

let serviceInMemoryRepository: ServiceInMemoryRepository
let categoryInMemoryRepository: CategoryInMemoryRepository
let sut: ServiceCreateService

describe('ServiceCreateService', () => {
  beforeAll(() => {
    serviceInMemoryRepository = new ServiceInMemoryRepository()
    categoryInMemoryRepository = new CategoryInMemoryRepository()

    sut = new ServiceCreateService(serviceInMemoryRepository)
  })

  it('should be ble create a available time', async () => {
    // const newService = serviceFactory()
    const result = await sut.execute({
      userId: '1',
      name: 'service name',
      duration: '1h',
      price: 80.0,
      categoryId: '1',
      attachmentsIds: ['1', '2'],
    })

    // console.log(result)
    // console.log(result.value)
    // console.log(result.isLeft())
    // console.log(result.isRight())

    expect(result.isRight()).toBe(true)
    expect(serviceInMemoryRepository.items).toHaveLength(1)
    expect(
      serviceInMemoryRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(serviceInMemoryRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityUUID('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityUUID('2') }),
      ],
    )
  })
})
