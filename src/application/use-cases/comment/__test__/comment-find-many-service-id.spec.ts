import { CommentServiceInMemoryRepository } from '@/application/repositories/in-memory/comment-service-in-memory.repository'
import { commentserviceFactory } from '@/application/repositories/in-memory/factories/comment-service.factory'
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
      commentserviceFactory({
        serviceId: new UniqueEntityUUID('comment-service-01'),
      }),
    )
    await commentServiceInMemoryRepository.create(
      commentserviceFactory({
        serviceId: new UniqueEntityUUID('comment-service-01'),
      }),
    )
    await commentServiceInMemoryRepository.create(
      commentserviceFactory({
        serviceId: new UniqueEntityUUID('comment-service-01'),
      }),
    )

    const { commentServices } = await sut.execute({
      serviceId: 'comment-service-01',
      page: 1,
    })

    expect(commentServices).toHaveLength(3)
  })

  it('should be ble to paginated comment service id', async () => {
    for (let i = 1; i <= 22; i++) {
      await commentServiceInMemoryRepository.create(
        commentserviceFactory({
          serviceId: new UniqueEntityUUID('comment-service-01'),
        }),
      )
    }

    const { commentServices } = await sut.execute({
      serviceId: 'comment-service-01',
      page: 2,
    })

    expect(commentServices).toHaveLength(2)
  })
})
