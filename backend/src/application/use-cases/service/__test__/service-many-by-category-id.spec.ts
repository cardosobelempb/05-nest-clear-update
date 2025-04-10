import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceAttachmentInMemoryRepository } from '@/application/repositories/in-memory/service-attachment-in-memory.repository'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { UniqueEntityUUID } from '@core'

import { ServiceManyByCategoryIdService } from '../service-many-by-category-id.service'

let serviceAttachmentInMemoryRepository: ServiceAttachmentInMemoryRepository
let serviceInMemoryRepository: ServiceInMemoryRepository
let sut: ServiceManyByCategoryIdService

describe('ServiceManyByCategoryIdService', () => {
  beforeEach(() => {
    serviceAttachmentInMemoryRepository = new ServiceAttachmentInMemoryRepository()
    serviceInMemoryRepository = new ServiceInMemoryRepository(serviceAttachmentInMemoryRepository)
    sut = new ServiceManyByCategoryIdService(serviceInMemoryRepository)
  })

  it('should not ble to service by category id', async () => {
    await serviceInMemoryRepository.create(
      serviceFactory({ categoryId: new UniqueEntityUUID('category-01') }),
    )
    await serviceInMemoryRepository.create(
      serviceFactory({ categoryId: new UniqueEntityUUID('category-01') }),
    )
    await serviceInMemoryRepository.create(
      serviceFactory({ categoryId: new UniqueEntityUUID('category-01') }),
    )

    const result = await sut.execute({ categoryId: 'category-01', page: 1 })

    expect(result.value?.services).toHaveLength(3)
  })

  it('should be ble to paginated service categories', async () => {
    for (let i = 1; i <= 22; i++) {
      await serviceInMemoryRepository.create(
        serviceFactory({
          categoryId: new UniqueEntityUUID('category-01'),
        }),
      )
    }

    const result = await sut.execute({ categoryId: 'category-01', page: 2 })

    expect(result.value?.services).toHaveLength(2)
  })
})
