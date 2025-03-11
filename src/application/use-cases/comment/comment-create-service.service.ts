import { CommentServiceEntity } from '@/anterprise/entity/comment-service.entity'
import { CommentServiceRepository } from '@/application/repositories/commnet-service.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

export namespace CommentCreateServiceProps {
  export interface Request {
    content: string
    userId: string
    serviceId: string
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
}

export class CommentCreateService {
  constructor(
    private readonly commentServiceRepository: CommentServiceRepository,
  ) {}

  async execute({
    content,
    userId,
    serviceId,
  }: CommentCreateServiceProps.Request): Promise<CommentCreateServiceProps.Response> {
    const commentService = CommentServiceEntity.create({
      content,
      userId: new UniqueEntityUUID(userId),
      serviceId: new UniqueEntityUUID(serviceId),
    })

    await this.commentServiceRepository.create(commentService)

    return right({})
  }
}
