import { CommentServiceInMemoryRepository } from '@/application/repositories/in-memory/comment-service-in-memory.repository'
import { commentServiceFactory } from '@/application/repositories/in-memory/factories/comment-service.factory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import { beforeEach } from 'vitest'
import { CommentDeleteService } from '../comment-delete-service.service'

let commentServiceInMemoryRepository: CommentServiceInMemoryRepository
let sut: CommentDeleteService

describe('CommentDeleteService', () => {
  beforeEach(() => {
    commentServiceInMemoryRepository = new CommentServiceInMemoryRepository()
    sut = new CommentDeleteService(commentServiceInMemoryRepository)
  })

  afterEach(() => {
    commentServiceInMemoryRepository.items = []
  })

  it('should be ble to comment delete a service', async () => {
    const commentService = commentServiceFactory()

    await commentServiceInMemoryRepository.create(commentService)

    await sut.execute({
      commentServiceId: commentService.id.toString(),
      userId: commentService.userId.toString(),
    })

    expect(commentServiceInMemoryRepository.items).toHaveLength(0)
  })

  it('should not ble to delete comment a service another user', async () => {
    const commentService = commentServiceFactory({
      userId: new UniqueEntityUUID('user-1'),
    })
    await commentServiceInMemoryRepository.create(commentService)

    const result = await sut.execute({
      commentServiceId: commentService.id.toString(),
      userId: 'user-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not ble to delete comment a service id not found', async () => {
    const commentService = commentServiceFactory()
    await commentServiceInMemoryRepository.create(commentService)

    const result = await sut.execute({
      commentServiceId: 'comment-service-1',
      userId: commentService.userId.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
