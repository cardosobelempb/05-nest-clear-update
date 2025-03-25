import { CategoryInMemoryRepository } from '@/application/repositories/in-memory/category-in-memory.repository'
import { ServiceAttachmentInMemoryRepository } from '@/application/repositories/in-memory/service-attachment-in-memory.repository'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { ServiceCreateService } from '../service-create.service'

let serviceAttachmentInMemoryRepository: ServiceAttachmentInMemoryRepository
let serviceInMemoryRepository: ServiceInMemoryRepository
let categoryInMemoryRepository: CategoryInMemoryRepository
let sut: ServiceCreateService

describe('ServiceCreateService', () => {
  beforeAll(() => {
    serviceAttachmentInMemoryRepository = new ServiceAttachmentInMemoryRepository()
    serviceInMemoryRepository = new ServiceInMemoryRepository(serviceAttachmentInMemoryRepository)
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
