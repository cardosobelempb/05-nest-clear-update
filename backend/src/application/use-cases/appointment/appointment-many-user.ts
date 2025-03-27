import { AppointmentRepository } from '@/application/repositories/appointmen.repository'
import { AppointmentEntity } from '@core'

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
