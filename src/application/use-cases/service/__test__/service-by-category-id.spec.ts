import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { ServiceByCategoryId } from '../service-by-category-id'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

let serviceInMemoryRepository: ServiceInMemoryRepository
let sut: ServiceByCategoryId

describe('ServiceByCategoryId', () => {
  beforeAll(() => {
    serviceInMemoryRepository = new ServiceInMemoryRepository()
    sut = new ServiceByCategoryId(serviceInMemoryRepository)
  })

  it('should not ble to service by category id', async () => {
    const newService = serviceFactory({
      categoryId: new UniqueEntityUUID('category-1'),
      userId: new UniqueEntityUUID('user-1'),
    })

    await serviceInMemoryRepository.create(newService)

    await sut.execute({
      categoryId: 'category-1',
    })

    expect(serviceInMemoryRepository.items).toHaveLength(1)
  })

  it('should be ble to service by category id', async () => {
    const newService = serviceFactory({
      categoryId: new UniqueEntityUUID('category-1'),
      userId: new UniqueEntityUUID('user-1'),
    })

    await serviceInMemoryRepository.create(newService)

    expect(() => {
      return sut.execute({
        categoryId: 'category-2',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
