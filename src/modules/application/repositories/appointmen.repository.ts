import { AppointmentEntity } from '@/modules/anterprise/entity/appointment.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export abstract class AppointmentRepository extends RepositoryAbstract<AppointmentEntity> {
  abstract findManyByUserId(userId: string, { page }: Pagination.Params): Promise<AppointmentEntity[]>
  abstract findManyByServiceId(serviceId: string, { page }: Pagination.Params): Promise<AppointmentEntity[]>
  abstract findManyByAvailableTimeId(availableTimeId: string, {page}: Pagination.Params): Promise<AppointmentEntity[]>
}
