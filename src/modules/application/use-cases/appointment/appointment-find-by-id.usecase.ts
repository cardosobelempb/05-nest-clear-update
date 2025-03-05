import { AppointmentEntity } from "@/modules/anterprise/entity/appointment.entity"

import { AppointmentRepository } from "../../repositories/appointmen.repository"
import { AppointmentAlreadyExistsError } from "../errors/appointment-already-exists.error"

export namespace AppointmentFindByIdProps {
  export interface Request {
    appointmentId: string
  }

  export type Response = {
    appointment: AppointmentEntity
  }

}

export class AppointmentFindByIdUseCase {
  constructor(
      private readonly appointmentRespository: AppointmentRepository,
    ) {}

    async execute({
      appointmentId
    }: AppointmentFindByIdProps.Request): Promise<AppointmentFindByIdProps.Response> {

      const appointment = await this.appointmentRespository.findById(appointmentId)

      if (!appointment) {
        throw new AppointmentAlreadyExistsError(appointmentId)
      }

      return {
        appointment,
      }
    }
}
