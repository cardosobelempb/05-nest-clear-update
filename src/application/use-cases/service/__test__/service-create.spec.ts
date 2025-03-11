import { CategoryInMemoryRepository } from '@/application/repositories/in-memory/category-in-memory.repository'
import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'

import { ServiceCreateService } from '../service-create'

let serviceInMemoryRepository: ServiceInMemoryRepository
let categoryInMemoryRepository: CategoryInMemoryRepository
let sut: ServiceCreateService

describe('ServiceCreateService', () => {
  beforeAll(() => {
    serviceInMemoryRepository = new ServiceInMemoryRepository()
    categoryInMemoryRepository = new CategoryInMemoryRepository()

    sut = new ServiceCreateService(
      categoryInMemoryRepository,
      serviceInMemoryRepository,
    )
  })

  it('should be ble create a available time', async () => {
    const newService = serviceFactory()
    const result = await sut.execute(newService)

    // console.log(result)
    // console.log(result.value)
    // console.log(result.isLeft())
    // console.log(result.isRight())

    expect(result.isRight()).toBe(true)
    expect(serviceInMemoryRepository.items).toHaveLength(1)
  })
})
