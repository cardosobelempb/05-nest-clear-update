import { AvailableTimeRepository } from '@/application/repositories/available-time.repository'
import { ServiceRepository } from '@/application/repositories/service.repository'
import { UserRepository } from '@/application/repositories/user.repository'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

import { AppointmentRepository } from '../../repositories/appointmen.repository'

export namespace AppointmentUpdateProps {
  export interface Request {
    userId: string
    serviceId: string
    appointmentId: string
    availableTimeId: string
  }

  export type Response = Either<ResourceNotFoundErro | NotAllowedErro, {}>
}

export class AppointmentUpdate {
  constructor(
    private readonly appointimentRespository: AppointmentRepository,
    private readonly serviceRespository: ServiceRepository,
    private readonly availableRepository: AvailableTimeRepository,
    private readonly userRespository: UserRepository,
  ) {}

  async execute({
    userId,
    appointmentId,
    serviceId,
    availableTimeId,
  }: AppointmentUpdateProps.Request): Promise<AppointmentUpdateProps.Response> {
    const user = await this.userRespository.findById(userId)
    const appointment =
      await this.appointimentRespository.findById(appointmentId)

    const service = await this.serviceRespository.findById(serviceId)

    const availableTime =
      await this.availableRepository.findById(availableTimeId)

    if (!user || !appointment || !service || !availableTime) {
      return left(new ResourceNotFoundErro())
    }

    if (
      userId !== user.id.toString() ||
      userId !== appointment.userId.toString() ||
      userId !== service.userId.toString() ||
      userId !== availableTime.userId.toString()
    ) {
      return left(new NotAllowedErro())
    }

    appointment.serviceId = new UniqueEntityUUID(serviceId)
    appointment.availableTimeId = new UniqueEntityUUID(appointmentId)

    await this.appointimentRespository.update(appointment)

    return right({})
  }
}
