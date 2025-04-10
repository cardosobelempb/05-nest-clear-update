import { Pagination, RepositoryAbstract, ServiceCommnetEntity } from "@core";

export abstract class ServiceCommentRepository extends RepositoryAbstract<ServiceCommnetEntity> {
  abstract findManyServiceId(
    serviceId: string,
    params: Pagination.Params,
  ): Promise<ServiceCommnetEntity[]>
}
