import { ServiceCommnetEntity } from '@/anterprise/entity/service-comment.entity'
import { ServiceCommentRepository } from '@/application/repositories/service-commnet.repository'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

export namespace ServiceFindManyCommentIdProps {
  export interface Request {
    page: number
    serviceId: string
  }

  export type Response = Either<
    null,
    {
      serviceComments: ServiceCommnetEntity[]
    }
  >
}

export class ServiceFindManyCommentIdService {
  constructor(
    private readonly serviceCommentRepository: ServiceCommentRepository,
  ) {}

  async execute({
    page,
    serviceId,
  }: ServiceFindManyCommentIdProps.Request): Promise<ServiceFindManyCommentIdProps.Response> {
    const serviceComments =
      await this.serviceCommentRepository.findManyServiceId(serviceId, { page })

    return right({
      serviceComments,
    })
  }
}
