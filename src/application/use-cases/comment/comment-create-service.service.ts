import { CommentServiceEntity } from '@/anterprise/entity/comment-service.entity'
import { CommentServiceRepository } from '@/application/repositories/commnet-service.repository'
import { ServiceRepository } from '@/application/repositories/service.repository'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

export namespace CommentCreateServiceProps {
  export interface Request {
    content: string
    userId: string
    serviceId: string
  }

  export type Response = Either<ResourceNotFoundErro, {
    commentService: CommentServiceEntity
  }>
}

export class CommentCreateService {
  constructor(
    private readonly serviceRespository: ServiceRepository,
    private readonly commentServiceRepository: CommentServiceRepository,
  ) {}

  async execute({
    content,
    userId,
    serviceId,
  }: CommentCreateServiceProps.Request): Promise<CommentCreateServiceProps.Response> {
    const service = await this.serviceRespository.findById(serviceId)

    if (!service) {
      return left(new ResourceNotFoundErro())
    }

    const commentService = CommentServiceEntity.create({
      content,
      userId: new UniqueEntityUUID(userId),
      serviceId: new UniqueEntityUUID(serviceId),
    })

    await this.commentServiceRepository.create(commentService)

    return right({
      commentService,
    })
  }
}
