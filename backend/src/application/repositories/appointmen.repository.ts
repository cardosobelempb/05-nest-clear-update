import { AppointmentEntity, RepositoryAbstract } from '@core'

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
