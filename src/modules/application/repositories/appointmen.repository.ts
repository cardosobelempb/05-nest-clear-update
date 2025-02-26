import { AppointmentEntity } from '@/modules/anterprise/entity/appointment.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class AppointmentRepository extends RepositoryAbstract<AppointmentEntity> {}
