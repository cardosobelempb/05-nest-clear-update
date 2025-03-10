import { CommentServiceEntity } from '@/anterprise/entity/comment-service.entity'
import { CommentServiceRepository } from '@/application/repositories/commnet-service.repository'

export namespace CommentFindManyServiceIdProps {
  export interface Request {
    page: number
    serviceId: string
  }

  export type Response = {
    commentServices: CommentServiceEntity[]
  }
}

export class CommentFindManyServiceId {
  constructor(
    private readonly commentServiceRepository: CommentServiceRepository,
  ) {}

  async execute({
    page,
    serviceId,
  }: CommentFindManyServiceIdProps.Request): Promise<CommentFindManyServiceIdProps.Response> {
    const commentServices =
      await this.commentServiceRepository.findManyServiceId(serviceId, { page })

    return {
      commentServices,
    }
  }
}
