import { AppointmentRepository } from '@/application/repositories/appointmen.repository'
import { AppointmentAlreadyExistsError, AppointmentEntity, Either, left, ResourceNotFoundError, right } from '@core'

export namespace AppointmentFindByIdProps {
  export interface Request {
    appointmentId: string
  }

  export type Response = Either<
    AppointmentAlreadyExistsError | ResourceNotFoundError,
    {
      appointment: AppointmentEntity
    }
  >
}

export class AppointmentFindByIdUseCase {
  constructor(private readonly appointmentRespository: AppointmentRepository) {}

  async execute({
    appointmentId,
  }: AppointmentFindByIdProps.Request): Promise<AppointmentFindByIdProps.Response> {
    const appointment =
      await this.appointmentRespository.findById(appointmentId)

    if (!appointment) {
      return left(new AppointmentAlreadyExistsError(appointmentId))
    }

    if (appointmentId !== appointment.userId.toString()) {
      return left(new ResourceNotFoundError())
    }

    return right({
      appointment,
    })
  }
}
