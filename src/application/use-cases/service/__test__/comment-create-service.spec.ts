import { serviceCommentFactory } from '@/application/repositories/in-memory/factories/comment-service.factory'
import { ServiceCommentInMemoryRepository } from '@/application/repositories/in-memory/service-comment-in-memory.repository'
import { ServiceCommentCreateService } from '../service-comment-create.service'

let serviceCommentInMemoryRepository: ServiceCommentInMemoryRepository
let sut: ServiceCommentCreateService

describe('ServiceCommentCreateService', () => {
  beforeEach(() => {
    serviceCommentInMemoryRepository = new ServiceCommentInMemoryRepository()
    sut = new ServiceCommentCreateService(serviceCommentInMemoryRepository)
  })

  it('should be ble create a comment service', async () => {
    const commentService = serviceCommentFactory()
    const result = await sut.execute(commentService)

    expect(result.isRight()).toBe(true)
    expect(serviceCommentInMemoryRepository.items).toHaveLength(1)
    // expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
