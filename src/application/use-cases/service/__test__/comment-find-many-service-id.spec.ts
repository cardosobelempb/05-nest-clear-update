import { CommentServiceInMemoryRepository } from '@/application/repositories/in-memory/service-comment-in-memory.repository'
import { commentServiceFactory } from '@/application/repositories/in-memory/factories/comment-service.factory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { CommentFindManyServiceId } from '../comment-find-many-service-id.service'

let commentServiceInMemoryRepository: CommentServiceInMemoryRepository
let sut: CommentFindManyServiceId

describe('CommentFindManyServiceId', () => {
  beforeEach(() => {
    commentServiceInMemoryRepository = new CommentServiceInMemoryRepository()
    sut = new CommentFindManyServiceId(commentServiceInMemoryRepository)
  })

  it('should not ble to comment by service id', async () => {
    await commentServiceInMemoryRepository.create(
      commentServiceFactory({
        serviceId: new UniqueEntityUUID('comment-service-01'),
      }),
    )
    await commentServiceInMemoryRepository.create(
      commentServiceFactory({
        serviceId: new UniqueEntityUUID('comment-service-01'),
      }),
    )
    await commentServiceInMemoryRepository.create(
      commentServiceFactory({
        serviceId: new UniqueEntityUUID('comment-service-01'),
      }),
    )

    const result = await sut.execute({
      serviceId: 'comment-service-01',
      page: 1,
    })

    expect(result.value?.commentServices).toHaveLength(3)
  })

  it('should be ble to paginated comment service id', async () => {
    for (let i = 1; i <= 22; i++) {
      await commentServiceInMemoryRepository.create(
        commentServiceFactory({
          serviceId: new UniqueEntityUUID('comment-service-01'),
        }),
      )
    }

    const result = await sut.execute({
      serviceId: 'comment-service-01',
      page: 2,
    })

    expect(result.value?.commentServices).toHaveLength(2)
  })
})
