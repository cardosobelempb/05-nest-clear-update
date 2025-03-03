import { ServiceEntity } from '@/modules/anterprise/entity/service.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export abstract class ServiceRepository extends RepositoryAbstract<ServiceEntity> {
  abstract findManyByUserId(user: string, { page }: Pagination.Params): Promise<ServiceEntity[]>
  abstract findManyByCategoryId(category: string, {page}: Pagination.Params): Promise<ServiceEntity[]>
}
