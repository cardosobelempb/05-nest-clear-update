import { ServiceEntity } from '@/anterprise/entity/service.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export abstract class ServiceRepository extends RepositoryAbstract<ServiceEntity> {
  abstract findByCategoryId(categoryId: string): Promise<ServiceEntity | null>

  abstract findManyByCategoryId(
    categoryId: string,
    { page }: Pagination.Params,
  ): Promise<ServiceEntity[]>
}
