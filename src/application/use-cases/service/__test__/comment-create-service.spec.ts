import { ServiceCommentInMemoryRepository } from '@/application/repositories/in-memory/service-comment-in-memory.repository'
import { commentServiceFactory } from '@/application/repositories/in-memory/factories/comment-service.factory'
import { CommentCreateService } from '../comment-create-service.service'

let serviceCommentInMemoryRepository: ServiceCommentInMemoryRepository
let sut: CommentCreateService

describe('CommentCreateService', () => {
  beforeEach(() => {
    serviceCommentInMemoryRepository = new ServiceCommentInMemoryRepository()
    sut = new CommentCreateService(serviceCommentInMemoryRepository)
  })

  it('should be ble create a comment service', async () => {
    const commentService = commentServiceFactory()
    const result = await sut.execute(commentService)

    expect(result.isRight()).toBe(true)
    expect(serviceCommentInMemoryRepository.items).toHaveLength(1)
    // expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
