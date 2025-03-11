import { CommentServiceInMemoryRepository } from '@/application/repositories/in-memory/comment-service-in-memory.repository'
import { commentServiceFactory } from '@/application/repositories/in-memory/factories/comment-service.factory'

import { CommentCreateService } from '../comment-create-service.service'

let commentServiceInMemoryRepository: CommentServiceInMemoryRepository
let sut: CommentCreateService

describe('CommentCreateService', () => {
  beforeEach(() => {
    commentServiceInMemoryRepository = new CommentServiceInMemoryRepository()
    sut = new CommentCreateService(commentServiceInMemoryRepository)
  })

  it('should be ble create a comment service', async () => {
    const commentService = commentServiceFactory()
    const result = await sut.execute(commentService)

    expect(result.isRight()).toBe(true)
    expect(commentServiceInMemoryRepository.items).toHaveLength(1)
    // expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
