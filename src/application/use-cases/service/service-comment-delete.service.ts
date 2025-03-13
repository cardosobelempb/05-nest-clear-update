import { ServiceCommentRepository } from '@/application/repositories/service-commnet.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import {
  Either,
  left,
  right,
} from '@/shared/infrastructure/handle-erros/either'

export namespace ServiceCommentDeleteServiceProps {
  export interface Request {
    userId: string
    commentServiceId: string
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
}

export class ServiceCommentDeleteService {
  constructor(
    private readonly serviceCommentRepository: ServiceCommentRepository,
  ) {}

  async execute({
    userId,
    commentServiceId,
  }: ServiceCommentDeleteServiceProps.Request): Promise<ServiceCommentDeleteServiceProps.Response> {
    const commentService =
      await this.serviceCommentRepository.findById(commentServiceId)

    if (!commentService) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== commentService.userId.toString()) {
      return left(new NotAllowedError())
    }

    await this.serviceCommentRepository.delete(commentService)

    return right({})
  }
}
