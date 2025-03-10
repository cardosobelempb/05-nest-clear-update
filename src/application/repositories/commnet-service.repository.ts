import { CommentServiceEntity } from '@/anterprise/entity/comment-service.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export abstract class CommentServiceRepository extends RepositoryAbstract<CommentServiceEntity> {
  abstract findManyServiceId(
    serviceId: string,
    params: Pagination.Params,
  ): Promise<CommentServiceEntity[]>
}
