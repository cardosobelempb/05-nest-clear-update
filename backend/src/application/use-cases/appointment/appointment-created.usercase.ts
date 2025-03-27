import { Appointment, AppointmentEntity, right, UniqueEntityUUID } from '@core'

import { AppointmentRepository } from '../../repositories/appointmen.repository'

export class AppointmentCreatedUseCase {
  constructor(private readonly appointmentRespository: AppointmentRepository) {}

  async execute({
    userId,
    serviceId,
    availableTimeId,
  }: Appointment.Request): Promise<Appointment.Response> {
    
    const appointment = AppointmentEntity.create({
      userId: new UniqueEntityUUID(userId),
      serviceId: new UniqueEntityUUID(serviceId),
      availableTimeId: new UniqueEntityUUID(availableTimeId),
    })

    await this.appointmentRespository.create(appointment)

    return right({
      appointment,
    })
  }
}
