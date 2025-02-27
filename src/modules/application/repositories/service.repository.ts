import { ServiceEntity } from '@/modules/anterprise/entity/service.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class ServiceRepository extends RepositoryAbstract<ServiceEntity> {}
