import { AppointmentEntity } from '@/anterprise/entity/appointment.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { AppointmentRepository } from '../../repositories/appointmen.repository'

export namespace AppointmentCreatedProps {
  export interface Request {
    userId: string
    availableTimeId: string
    serviceId: string
  }

  export type Response = {
    appointment: AppointmentEntity
  }
}

export class AppointmentCreatedUseCase {
  constructor(private readonly appointmentRespository: AppointmentRepository) {}

  async execute({
    userId,
    serviceId,
    availableTimeId,
  }: AppointmentCreatedProps.Request): Promise<AppointmentCreatedProps.Response> {
    const appointment = AppointmentEntity.create({
      userId: new UniqueEntityUUID(userId),
      serviceId: new UniqueEntityUUID(serviceId),
      availableTimeId: new UniqueEntityUUID(availableTimeId),
    })

    await this.appointmentRespository.create(appointment)

    return {
      appointment,
    }
  }
}
