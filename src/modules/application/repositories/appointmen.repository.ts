import { AppointmentEntity } from '@/modules/anterprise/entity/appointment.entity'
import { UserEntity } from '@/modules/anterprise/entity/user.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export abstract class AppointmentRepository extends RepositoryAbstract<AppointmentEntity> {
  // abstract appointmentManyUsers(
  //   userId: string,
  //   { page }: Pagination.Params,
  // ): Promise<UserEntity[]>
  // abstract findManyByServiceId(
  //   serviceId: string,
  //   { page }: Pagination.Params,
  // ): Promise<AppointmentEntity[]>
  // abstract findManyByAvailableTimeId(
  //   availableTimeId: string,
  //   { page }: Pagination.Params,
  // ): Promise<AppointmentEntity[]>
}
