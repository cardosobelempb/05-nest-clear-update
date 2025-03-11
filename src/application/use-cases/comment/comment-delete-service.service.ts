import { CommentServiceRepository } from '@/application/repositories/commnet-service.repository'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

export namespace CommentDeleteServiceProps {
  export interface Request {
    userId: string
    commentServiceId: string
  }

  export type Response = Either<ResourceNotFoundErro | NotAllowedErro, {}>
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
      return left(new ResourceNotFoundErro())
    }

    if (userId !== commentService.userId.toString()) {
      return left(new NotAllowedErro())
    }

    await this.commentServiceRepository.delete(commentService)

    return right({})
  }
}
