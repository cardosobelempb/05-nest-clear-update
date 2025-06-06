import { ServiceCommnetEntity } from '@/anterprise/entity/service-comment.entity'
import { ServiceCommentRepository } from '@/application/repositories/service-commnet.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'
import { UniqueEntityUUID } from '@core'

export namespace ServiceCommentCreateProps {
  export interface Request {
    content: string
    userId: UniqueEntityUUID
    serviceId: UniqueEntityUUID
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
}

export class ServiceCommentCreateService {
  constructor(
    private readonly serviceCommentRepository: ServiceCommentRepository,
  ) {}

  async execute({
    content,
    userId,
    serviceId,
  }: ServiceCommentCreateProps.Request): Promise<ServiceCommentCreateProps.Response> {
    const serviceComment = ServiceCommnetEntity.create({
      content,
      userId,
      serviceId,
      commentId: new UniqueEntityUUID(),
    })

    await this.serviceCommentRepository.create(serviceComment)

    return right({})
  }
}
