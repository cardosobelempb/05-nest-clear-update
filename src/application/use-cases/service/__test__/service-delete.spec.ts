import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { ServiceDelete } from '../service-delete'

let serviceInMemoryRepository: ServiceInMemoryRepository
let sut: ServiceDelete

describe('ServiceDelete', () => {
  beforeAll(() => {
    serviceInMemoryRepository = new ServiceInMemoryRepository()
    sut = new ServiceDelete(serviceInMemoryRepository)
  })

  it('should be ble to delete a service', async () => {
    const newService = serviceFactory(
      {
        userId: new UniqueEntityUUID('user-1'),
      },
      new UniqueEntityUUID('service-1'),
    )

    await serviceInMemoryRepository.create(newService)

    await sut.execute({
      serviceId: 'service-1',
      userId: 'user-1',
    })

    expect(serviceInMemoryRepository.items).toHaveLength(0)
  })

  it('should not ble to delete a service another user', async () => {
    const newService = serviceFactory(
      {
        userId: new UniqueEntityUUID('user-1'),
      },
      new UniqueEntityUUID('service-1'),
    )

    await serviceInMemoryRepository.create(newService)

    expect(() => {
      return sut.execute({
        serviceId: 'service-1',
        userId: 'user-2',
      })
    }).rejects.toBeInstanceOf(NotAllowedErro)
  })
})
