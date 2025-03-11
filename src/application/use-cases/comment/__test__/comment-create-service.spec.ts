import { CommentServiceInMemoryRepository } from '@/application/repositories/in-memory/comment-service-in-memory.repository'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'

import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { CommentCreateService } from '../comment-create-service.service'
import { commentServiceFactory } from '@/application/repositories/in-memory/factories/comment-service.factory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

let serviceInMemoryRepository: ServiceInMemoryRepository
let commentServiceInMemoryRepository: CommentServiceInMemoryRepository
let sut: CommentCreateService

describe('CommentCreateService', () => {
  beforeEach(() => {
    commentServiceInMemoryRepository = new CommentServiceInMemoryRepository()
    sut = new CommentCreateService(commentServiceInMemoryRepository)
  })

  it.skip('should be ble create a comment service', async () => {
    // const commentService = commentServiceFactory()
    // const result = await sut.execute(commentService.userId)
    // expect(result.isLeft()).toBe(true)
    // expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
