import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { ServiceManyByCategoryId } from '../service-many-by-category-id.service'

let serviceInMemoryRepository: ServiceInMemoryRepository
let sut: ServiceManyByCategoryId

describe('ServiceManyByCategoryId', () => {
  beforeEach(() => {
    serviceInMemoryRepository = new ServiceInMemoryRepository()
    sut = new ServiceManyByCategoryId(serviceInMemoryRepository)
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

    const result = await sut.execute({categoryId: 'category-01',  page: 1 })

    expect(result.services).toHaveLength(3)
  })

  it('should be ble to paginated service categories', async () => {
    for (let i = 1; i <= 22; i++){
      await serviceInMemoryRepository.create(serviceFactory({
         categoryId: new UniqueEntityUUID('category-01')
       }))
    }

    const result = await sut.execute({ categoryId: 'category-01', page: 2 })

    expect(result.services).toHaveLength(2)
  })
})
