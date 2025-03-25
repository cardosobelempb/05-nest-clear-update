import { serviceAttachmentFactory } from '@/application/repositories/in-memory/factories/service-attachment.factory'
import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { ServiceDeleteService } from '../service-delete.service'
import { ServiceAttachmentInMemoryRepository } from './../../../repositories/in-memory/service-attachment-in-memory.repository'

let serviceAttachmentInMemoryRepository: ServiceAttachmentInMemoryRepository
let serviceInMemoryRepository: ServiceInMemoryRepository
let sut: ServiceDeleteService

describe('ServiceDeleteService', () => {
  beforeAll(() => {
    serviceAttachmentInMemoryRepository =
    new ServiceAttachmentInMemoryRepository()
    serviceInMemoryRepository = new ServiceInMemoryRepository(serviceAttachmentInMemoryRepository)
    sut = new ServiceDeleteService(serviceInMemoryRepository)
  })

  afterEach(() => {
    serviceInMemoryRepository.items = []
  })

  it('should be ble to delete a service', async () => {
    await serviceInMemoryRepository.create(
      serviceFactory(
        {
          userId: new UniqueEntityUUID('user-01'),
        },
        new UniqueEntityUUID('service-01'),
      ),
    )

    await serviceAttachmentInMemoryRepository.create(
      serviceAttachmentFactory({
        serviceId: new UniqueEntityUUID('service-01'),
        attachmentId: new UniqueEntityUUID('attachment-01'),
      }),
    )

    await serviceAttachmentInMemoryRepository.create(
      serviceAttachmentFactory({
        serviceId: new UniqueEntityUUID('service-01'),
        attachmentId: new UniqueEntityUUID('attachment-02'),
      }),
    )

    const result = await sut.execute({
      userId: 'user-01',
      serviceId: 'service-01',
    })

    expect(result.isRight()).toEqual(true)
    expect(serviceInMemoryRepository.items).toHaveLength(0)
    expect(serviceAttachmentInMemoryRepository.items).toHaveLength(0)
  })

  it('should not ble to delete a service another user', async () => {
    const service = serviceFactory({
      userId: new UniqueEntityUUID('user-01'),
    })
    await serviceInMemoryRepository.create(service)

    const result = await sut.execute({
      serviceId: service.id.toString(),
      userId: 'user-02',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
