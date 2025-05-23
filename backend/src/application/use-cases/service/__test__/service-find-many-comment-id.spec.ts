import { serviceCommentFactory } from '@/application/repositories/in-memory/factories/service-comment.factory'
import { ServiceCommentInMemoryRepository } from '@/application/repositories/in-memory/service-comment-in-memory.repository'
import { UniqueEntityUUID } from '@core'

import { ServiceFindManyCommentIdService } from '../service-find-many-comment-id.service'

let serviceCommentInMemoryRepository: ServiceCommentInMemoryRepository
let sut: ServiceFindManyCommentIdService

describe('ServiceFindManyCommentIdService', () => {
  beforeEach(() => {
    serviceCommentInMemoryRepository = new ServiceCommentInMemoryRepository()
    sut = new ServiceFindManyCommentIdService(serviceCommentInMemoryRepository)
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
