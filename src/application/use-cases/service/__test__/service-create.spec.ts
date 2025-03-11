import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'

import { ServiceCreate } from '../service-create'
import { CategoryInMemoryRepository } from '@/application/repositories/in-memory/category-in-memory.repository'

let serviceInMemoryRepository: ServiceInMemoryRepository
let categoryInMemoryRepository: CategoryInMemoryRepository
let sut: ServiceCreate

describe('ServiceCreate', () => {
  beforeAll(() => {
    serviceInMemoryRepository = new ServiceInMemoryRepository()
    categoryInMemoryRepository = new CategoryInMemoryRepository()

    sut = new ServiceCreate(
      categoryInMemoryRepository,
      serviceInMemoryRepository,
    )
  })

  it.skip('should be ble create a available time', async () => {
    // const newService = serviceFactory({})
    // const result = await sut.execute(newService)
    // expect(result.value?.service.id).toBeTruthy()
    // expect(serviceInMemoryRepository.items[0].id).toEqual(
    //   result.value?.service.id,
    // )
  })
})
