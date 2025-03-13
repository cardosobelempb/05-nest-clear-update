import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { ServiceDeleteService } from '../service-delete.service'

let serviceInMemoryRepository: ServiceInMemoryRepository
let sut: ServiceDeleteService

describe('ServiceDeleteService', () => {
  beforeAll(() => {
    serviceInMemoryRepository = new ServiceInMemoryRepository()
    sut = new ServiceDeleteService(serviceInMemoryRepository)
  })

  it('should be ble to delete a service', async () => {
    await serviceInMemoryRepository.create(
      serviceFactory(
        {
          userId: new UniqueEntityUUID('user-1'),
        },
        new UniqueEntityUUID('service-1'),
      ),
    )

    await sut.execute({
      userId: 'user-1',
      serviceId: 'service-1',
    })

    expect(serviceInMemoryRepository.items).toHaveLength(0)
  })

  it('should not ble to delete a service another user', async () => {
    const service = serviceFactory({
      userId: new UniqueEntityUUID('user-1'),
    })
    await serviceInMemoryRepository.create(service)

    const result = await sut.execute({
      serviceId: service.id.toString(),
      userId: 'user-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
