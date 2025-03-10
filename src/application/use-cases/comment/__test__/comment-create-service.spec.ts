import { CommentServiceInMemoryRepository } from '@/application/repositories/in-memory/comment-service-in-memory.repository'
import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { CommentCreateService } from '../comment-create-service.service'

let serviceInMemoryRepository: ServiceInMemoryRepository
let commentServiceInMemoryRepository: CommentServiceInMemoryRepository
let sut: CommentCreateService

describe('CommentCreateService', () => {
  beforeEach(() => {
    serviceInMemoryRepository = new ServiceInMemoryRepository()
    commentServiceInMemoryRepository = new CommentServiceInMemoryRepository()

    sut = new CommentCreateService(
      serviceInMemoryRepository,
      commentServiceInMemoryRepository,
    )
  })

  it('should be ble create a comment service', async () => {
    const service = serviceFactory({}, new UniqueEntityUUID('service-01'))
    await serviceInMemoryRepository.create(service)

    const { commentService } = await sut.execute({
      userId: service.userId.toString(),
      serviceId: service.id.toString(),
      content: 'Comentário test',
    })

    await commentServiceInMemoryRepository.create(commentService)

    expect(commentService.id).toBeTruthy()
    expect(commentServiceInMemoryRepository.items[0].content).toEqual(
      'Comentário test',
    )
  })
})
