import { RepositoryAbstract, ServiceAttachmentEntity } from "@core";

export abstract class ServiceAttachmentRepository extends RepositoryAbstract<ServiceAttachmentEntity> {
  abstract deleteManyServiceId(serviceId: string): Promise<void>
  abstract findManyByServiceId(
    serviceId: string,
  ): Promise<ServiceAttachmentEntity[]>
}
