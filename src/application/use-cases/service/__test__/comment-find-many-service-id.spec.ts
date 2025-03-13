import { serviceCommentFactory } from '@/application/repositories/in-memory/factories/comment-service.factory'
import { ServiceCommentInMemoryRepository } from '@/application/repositories/in-memory/service-comment-in-memory.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { ServiceFindManyCommentId } from '../service-find-many-comment-id.service'

let serviceCommentInMemoryRepository: ServiceCommentInMemoryRepository
let sut: ServiceFindManyCommentId

describe('ServiceFindManyCommentId', () => {
  beforeEach(() => {
    serviceCommentInMemoryRepository = new ServiceCommentInMemoryRepository()
    sut = new ServiceFindManyCommentId(serviceCommentInMemoryRepository)
  })

  it('should not ble to comment by service id', async () => {
    await serviceCommentInMemoryRepository.create(
      serviceCommentFactory({
        serviceId: new UniqueEntityUUID('comment-service-01'),
      }),
    )
    await serviceCommentInMemoryRepository.create(
      serviceCommentFactory({
        serviceId: new UniqueEntityUUID('comment-service-01'),
      }),
    )
    await serviceCommentInMemoryRepository.create(
      serviceCommentFactory({
        serviceId: new UniqueEntityUUID('comment-service-01'),
      }),
    )

    const result = await sut.execute({
      serviceId: 'comment-service-01',
      page: 1,
    })

    expect(result.value?.serviceComments).toHaveLength(3)
  })

  it('should be ble to paginated comment service id', async () => {
    for (let i = 1; i <= 22; i++) {
      await serviceCommentInMemoryRepository.create(
        serviceCommentFactory({
          serviceId: new UniqueEntityUUID('comment-service-01'),
        }),
      )
    }

    const result = await sut.execute({
      serviceId: 'comment-service-01',
      page: 2,
    })

    expect(result.value?.serviceComments).toHaveLength(2)
  })
})
