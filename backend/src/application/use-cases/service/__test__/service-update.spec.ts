import { CategoryInMemoryRepository } from '@/application/repositories/in-memory/category-in-memory.repository'
import { categoryFactory } from '@/application/repositories/in-memory/factories/category.factory'
import { serviceAttachmentFactory } from '@/application/repositories/in-memory/factories/service-attachment.factory'
import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceAttachmentInMemoryRepository } from '@/application/repositories/in-memory/service-attachment-in-memory.repository'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@core'

import { ServiceUpdateService } from '../service-update.service'

let serviceAttachmentInMemoryRepository: ServiceAttachmentInMemoryRepository
let serviceInMemoryRepository: ServiceInMemoryRepository
let categoryInMemoryRepository: CategoryInMemoryRepository
let sut: ServiceUpdateService

describe('ServiceUpdateService', () => {
  beforeEach(() => {
    serviceAttachmentInMemoryRepository =
      new ServiceAttachmentInMemoryRepository()
    serviceInMemoryRepository = new ServiceInMemoryRepository(serviceAttachmentInMemoryRepository)
    categoryInMemoryRepository = new CategoryInMemoryRepository()
    sut = new ServiceUpdateService(
      serviceAttachmentInMemoryRepository,
      serviceInMemoryRepository,
      categoryInMemoryRepository,
    )
  })

  it('should ble to update a service from user', async () => {
    await categoryInMemoryRepository.create(
      categoryFactory(
        { userId: new UniqueEntityUUID('user-01') },
        new UniqueEntityUUID('category-01'),
      ),
    )

    await serviceInMemoryRepository.create(
      serviceFactory(
        {
          userId: new UniqueEntityUUID('user-01'),
          categoryId: new UniqueEntityUUID('category-01'),
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
      name: 'newService name',
      serviceId: 'service-01',
      categoryId: 'category-01',
      attachmentsIds: ['attachment-01', 'attachment-03'],
    })

    expect(result.isRight()).toEqual(true)
    expect(serviceInMemoryRepository.items[0]).toMatchObject({
      name: 'newService name',
    })

    expect(
      serviceInMemoryRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)

    expect(serviceInMemoryRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({
          attachmentId: new UniqueEntityUUID('attachment-01'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityUUID('attachment-03'),
        }),
      ],
    )
  })

  it('should not ble to update a service another user', async () => {
    await categoryInMemoryRepository.create(
      categoryFactory(
        { userId: new UniqueEntityUUID('user-01') },
        new UniqueEntityUUID('category-01'),
      ),
    )

    await serviceInMemoryRepository.create(
      serviceFactory(
        {
          userId: new UniqueEntityUUID('user-01'),
          categoryId: new UniqueEntityUUID('category-01'),
        },
        new UniqueEntityUUID('service-01'),
      ),
    )

    const result = await sut.execute({
      userId: 'user-02',
      name: 'newService name',
      serviceId: 'service-01',
      categoryId: 'category-01',
      attachmentsIds: [],
    })

    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
