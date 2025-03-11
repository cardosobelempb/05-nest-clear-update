import { CommentServiceEntity } from '@/anterprise/entity/comment-service.entity'
import { CommentServiceRepository } from '@/application/repositories/commnet-service.repository'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

export namespace CommentFindManyServiceIdProps {
  export interface Request {
    page: number
    serviceId: string
  }

  export type Response = Either<null, {
    commentServices: CommentServiceEntity[]
  }>
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

    return right({
      commentServices,
    })
  }
}
