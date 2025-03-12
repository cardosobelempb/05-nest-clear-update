import { ServiceCommnetEntity } from '@/anterprise/entity/service-comment.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export abstract class ServiceCommentRepository extends RepositoryAbstract<ServiceCommnetEntity> {
  abstract findManyServiceId(
    serviceId: string,
    params: Pagination.Params,
  ): Promise<ServiceCommnetEntity[]>
}
