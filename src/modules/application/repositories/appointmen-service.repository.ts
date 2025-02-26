import { AppointmentServiceEntity } from '@/modules/anterprise/entity/appointment-service.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class AppointmentServiceRepository extends RepositoryAbstract<AppointmentServiceEntity> {}
