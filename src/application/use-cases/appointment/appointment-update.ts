import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { AvailableTimeRepository } from '@/application/repositories/available-time.repository'
import { ServiceRepository } from '@/application/repositories/service.repository'
import { AppointmentRepository } from '../../repositories/appointmen.repository'

export namespace AppointmentUpdateProps {
  export interface Request {
    userId: string
    serviceId: string
    appointmentId: string
    availableTimeId: string
  }

  export type Response = {}
}

export class AppointmentUpdate {
  constructor(
    private readonly appointimentRespository: AppointmentRepository,
    private readonly serviceRespository: ServiceRepository,
    private readonly availableRepository: AvailableTimeRepository,
  ) {}

  async execute({
    userId,
    serviceId,
    appointmentId,
    availableTimeId,
  }: AppointmentUpdateProps.Request) {
    const appointment =
      await this.appointimentRespository.findById(appointmentId)
    const service = await this.serviceRespository.findById(serviceId)
    const availableTime =
      await this.availableRepository.findById(availableTimeId)

    if (!appointment) {
      throw new ResourceNotFoundErro()
    }

    if (userId !== appointment?.userId.toString()) {
      throw new NotAllowedErro()
    }

    if (!service) {
      throw new ResourceNotFoundErro()
    }

    if (userId !== service?.userId.toString()) {
      throw new NotAllowedErro()
    }

    if (!availableTime) {
      throw new ResourceNotFoundErro()
    }

    if (userId !== appointment?.userId.toString()) {
      throw new NotAllowedErro()
    }

    appointment.serviceId = new UniqueEntityUUID(serviceId)
    appointment.availableTimeId = new UniqueEntityUUID(appointmentId)

    await this.appointimentRespository.update(appointment)

    return {}
  }
}
