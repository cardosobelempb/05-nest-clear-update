import { AppointmentTimeEntity } from '@/modules/anterprise/entity/appointment-time.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class AppointmentTimeRepository extends RepositoryAbstract<AppointmentTimeEntity> {
  abstract findByName(name: string): Promise<AppointmentTimeEntity | null>
}
