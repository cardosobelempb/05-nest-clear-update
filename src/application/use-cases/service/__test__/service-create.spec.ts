import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'

import { ServiceCreate } from '../service-create'

let serviceInMemoryRepository: ServiceInMemoryRepository
let sut: ServiceCreate

describe('ServiceCreate', () => {
  beforeAll(() => {
    serviceInMemoryRepository = new ServiceInMemoryRepository()

    sut = new ServiceCreate(serviceInMemoryRepository)
  })

  it('should be ble create a available time', async () => {
    const newService = serviceFactory()
    // console.log(newService)

    const { service } = await sut.execute({
      userId: newService.userId.toString(),
      categoryId: '',
      duration: '',
      name: '',
      price: 20.00
    })

    expect(service.id).toBeTruthy()
    expect(serviceInMemoryRepository.items[0].id).toEqual(service.id)
  })
})
