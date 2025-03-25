import { serviceCommentFactory } from '@/application/repositories/in-memory/factories/service-comment.factory'
import { ServiceCommentInMemoryRepository } from '@/application/repositories/in-memory/service-comment-in-memory.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import { beforeEach } from 'vitest'
import { ServiceCommentDeleteService } from '../service-comment-delete.service'

let serviceCommentInMemoryRepository: ServiceCommentInMemoryRepository
let sut: ServiceCommentDeleteService

describe('ServiceCommentDeleteService', () => {
  beforeEach(() => {
    serviceCommentInMemoryRepository = new ServiceCommentInMemoryRepository()
    sut = new ServiceCommentDeleteService(serviceCommentInMemoryRepository)
  })

  afterEach(() => {
    serviceCommentInMemoryRepository.items = []
  })

  it('should be ble to comment delete a service', async () => {
    const commentService = serviceCommentFactory()

    await serviceCommentInMemoryRepository.create(commentService)

    await sut.execute({
      commentServiceId: commentService.id.toString(),
      userId: commentService.userId.toString(),
    })

    expect(serviceCommentInMemoryRepository.items).toHaveLength(0)
  })

  it('should not ble to delete comment a service another user', async () => {
    const commentService = serviceCommentFactory({
      userId: new UniqueEntityUUID('user-1'),
    })
    await serviceCommentInMemoryRepository.create(commentService)

    const result = await sut.execute({
      commentServiceId: commentService.id.toString(),
      userId: 'user-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not ble to delete comment a service id not found', async () => {
    const commentService = serviceCommentFactory()
    await serviceCommentInMemoryRepository.create(commentService)

    const result = await sut.execute({
      commentServiceId: 'comment-service-1',
      userId: commentService.userId.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
