import { CommentServiceRepository } from '@/application/repositories/service-commnet.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import {
  Either,
  left,
  right,
} from '@/shared/infrastructure/handle-erros/either'

export namespace CommentDeleteServiceProps {
  export interface Request {
    userId: string
    commentServiceId: string
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
}

export class CommentDeleteService {
  constructor(
    private readonly commentServiceRepository: CommentServiceRepository,
  ) {}

  async execute({
    userId,
    commentServiceId,
  }: CommentDeleteServiceProps.Request): Promise<CommentDeleteServiceProps.Response> {
    const commentService =
      await this.commentServiceRepository.findById(commentServiceId)

    if (!commentService) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== commentService.userId.toString()) {
      return left(new NotAllowedError())
    }

    await this.commentServiceRepository.delete(commentService)

    return right({})
  }
}
