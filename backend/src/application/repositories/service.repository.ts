import { Pagination, RepositoryAbstract, ServiceEntity } from "@core";

export abstract class ServiceRepository extends RepositoryAbstract<ServiceEntity> {
  abstract findByCategoryId(categoryId: string): Promise<ServiceEntity | null>
  abstract findManyByCategoryId(
    categoryId: string,
    { page }: Pagination.Params,
  ): Promise<ServiceEntity[]>

}
