import { AppointmentInMemoryRepository } from '@/application/repositories/in-memory/appointment-in-memory.repository'

import { ServiceCreate } from '../service-create'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'

let serviceInMemoryRepository: ServiceInMemoryRepository
let sut: ServiceCreate

describe('ServiceCreate', () => {
  beforeAll(() => {
    serviceInMemoryRepository = new ServiceInMemoryRepository()

    sut = new ServiceCreate(serviceInMemoryRepository)
  })

  it('should be ble create a available time', async () => {
    const newService = serviceFactory()

    const { service } = await sut.execute(newService)

    expect(service.id).toBeTruthy()
    expect(serviceInMemoryRepository.items[0].id).toEqual(service.id)
  })
})
