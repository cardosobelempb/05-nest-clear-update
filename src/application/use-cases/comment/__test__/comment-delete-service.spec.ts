import { CommentServiceInMemoryRepository } from '@/application/repositories/in-memory/comment-service-in-memory.repository'
import { commentserviceFactory } from '@/application/repositories/in-memory/factories/comment-service.factory'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { CommentDeleteService } from '../comment-delete-service.service'

let commentServiceInMemoryRepository: CommentServiceInMemoryRepository
let sut: CommentDeleteService

describe('CommentDeleteService', () => {
  beforeAll(() => {
    commentServiceInMemoryRepository = new CommentServiceInMemoryRepository()
    sut = new CommentDeleteService(commentServiceInMemoryRepository)
  })

  it('should be ble to comment delete a service', async () => {
    const commentService = commentserviceFactory()

    await commentServiceInMemoryRepository.create(commentService)

    await sut.execute({
      commentServiceId: commentService.id.toString(),
      userId: commentService.userId.toString(),
    })

    expect(commentServiceInMemoryRepository.items).toHaveLength(0)
  })

  it('should not ble to delete comment a service another user', async () => {

    await commentServiceInMemoryRepository.create(commentserviceFactory({
      userId: new UniqueEntityUUID('userId-01'),
      serviceId: new UniqueEntityUUID('serviceId-01')
    }, new UniqueEntityUUID('commentServiceId-01')))

    console.log(commentServiceInMemoryRepository.items[0])

    const result = await sut.execute({
        commentServiceId: 'commentServiceId-01',
        userId: 'userId-02',
    })


    expect(() => {
      return sut.execute({
        commentServiceId: 'commentServiceId-01',
        userId: 'userId-02',
    })
    }).rejects.toBeInstanceOf(NotAllowedErro)
  })
})
