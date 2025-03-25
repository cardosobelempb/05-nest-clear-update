import { ServiceAttachmentEntity } from '@/anterprise/entity/service-attachment.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class ServiceAttachmentRepository extends RepositoryAbstract<ServiceAttachmentEntity> {
  abstract deleteManyServiceId(serviceId: string): Promise<void>
  abstract findManyByServiceId(
    serviceId: string,
  ): Promise<ServiceAttachmentEntity[]>
}
