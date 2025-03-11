import { AppointmentEntity } from '@/anterprise/entity/appointment.entity'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

import { AppointmentRepository } from '../../repositories/appointmen.repository'
import { AppointmentAlreadyExistsError } from '../errors/appointment-already-exists.error'

export namespace AppointmentFindByIdProps {
  export interface Request {
    appointmentId: string
  }

  export type Response = Either<AppointmentAlreadyExistsError | ResourceNotFoundErro, {
    appointment: AppointmentEntity
  }>
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
      return left(new ResourceNotFoundErro())
    }

    return right({
      appointment,
    })
  }
}
