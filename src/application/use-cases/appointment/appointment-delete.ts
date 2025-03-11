import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

import { AppointmentRepository } from '../../repositories/appointmen.repository'

export namespace AppointmentDeleteProps {
  export interface Request {
    userId: string
    appointmentId: string
  }

  export type Response = Either<ResourceNotFoundErro | NotAllowedErro, {}>
}

export class AppointmentDelete {
  constructor(
    private readonly appointimentRespository: AppointmentRepository,
  ) {}

  async execute({ userId, appointmentId }: AppointmentDeleteProps.Request) {
    const appointment =
      await this.appointimentRespository.findById(appointmentId)

    if (!appointment) {
      return left(new ResourceNotFoundErro())
    }

    if (userId !== appointment.userId.toString()) {
      return left(new NotAllowedErro())
    }

    await this.appointimentRespository.delete(appointment)

    return right({})
  }
}
