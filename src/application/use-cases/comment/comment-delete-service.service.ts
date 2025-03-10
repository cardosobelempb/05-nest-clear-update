import { CommentServiceRepository } from '@/application/repositories/commnet-service.repository'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'

export namespace CommentDeleteServiceProps {
  export interface Request {
    userId: string
    commentServiceId: string
  }

  export type Response = {}
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
      throw new ResourceNotFoundErro()
    }

    if (userId !== commentService.userId.toString()) {
      throw new NotAllowedErro()
    }

    await this.commentServiceRepository.delete(commentService)

    return {}
  }
}
