import { NotAllowedErro } from "@/shared/application/usecase-erros/not-allowed.erro"
import { ResourceNotFoundErro } from "@/shared/application/usecase-erros/resource-not-found.error"
import { UniqueEntityUUID } from "@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid"

import { AppointmentRepository } from "../../repositories/appointmen.repository"

export namespace AppointmentUpdateProps {
  export interface Request {
    userId: string,
    serviceId: string,
    appointmentId: string
    availableTimeId: string,
  }

  export type Response = {}

}

export class AppointmentUpdate {
  constructor(private readonly appointimentRespository: AppointmentRepository) { }

  async execute({
    userId,
    serviceId,
    appointmentId,
    availableTimeId,
  }: AppointmentUpdateProps.Request) {

    const appointment = await this.appointimentRespository.findById(appointmentId)

    if (!appointment) {
      throw new ResourceNotFoundErro()
    }

    if (!appointment?.userId) {
      throw new NotAllowedErro()
    }

    if (userId !== appointment.userId.toString()) {
      throw new NotAllowedErro()
    }

    if (!appointment.serviceId) {
      throw new NotAllowedErro()
    }

    if (serviceId !== appointment.serviceId.toString()) {
      throw new NotAllowedErro()
    }

    if (!appointment.availableTimeId) {
      throw new NotAllowedErro()
    }

    if (availableTimeId !== appointment.availableTimeId.toString()) {
      throw new NotAllowedErro()
    }

    appointment.serviceId = new UniqueEntityUUID(serviceId)
    appointment.availableTimeId = new UniqueEntityUUID(appointmentId)

    await this.appointimentRespository.update(appointment)

    return {}

  }

}
