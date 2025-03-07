import { AppointmentEntity } from '@/anterprise/entity/appointment.entity'

import { AppointmentRepository } from '../../repositories/appointmen.repository'
import { AppointmentAlreadyExistsError } from '../errors/appointment-already-exists.error'

export namespace AppointmentManyUserProps {
  export interface Request {
    appointmentId: string
    userId: string
    serviceId: string
  }

  export type Response = {
    appointment: AppointmentEntity
  }
}

export class AppointmentManyUserUseCase {
  constructor(private readonly appointmentRespository: AppointmentRepository) {}

  async execute({ appointmentId }: AppointmentManyUserProps.Request) {
    // const appointment =
    //   await this.appointmentRespository.userService(appointmentId)
    // if (!appointment) {
    //   throw new AppointmentAlreadyExistsError(appointmentId)
    // }
    // return {
    //   appointment,
    // }
  }
}
