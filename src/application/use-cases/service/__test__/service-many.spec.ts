import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'

import { ServiceManyService } from '../service-many.service'

let serviceInMemoryRepository: ServiceInMemoryRepository
let sut: ServiceManyService

describe('ServiceManyService', () => {
  beforeEach(() => {
    serviceInMemoryRepository = new ServiceInMemoryRepository()
    sut = new ServiceManyService(serviceInMemoryRepository)
  })

  it('should not ble to many service', async () => {
    await serviceInMemoryRepository.create(
      serviceFactory({ createdAt: new Date(2022, 0, 20) }),
    )
    await serviceInMemoryRepository.create(
      serviceFactory({ createdAt: new Date(2022, 0, 18) }),
    )
    await serviceInMemoryRepository.create(
      serviceFactory({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.value?.services).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) })
    ])
  })

  it('should be ble to paginated services', async () => {
    for (let i = 1; i <= 22; i++){
       await serviceInMemoryRepository.create(serviceFactory())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.value?.services).toHaveLength(2)
  })
})
