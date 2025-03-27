import { Either, left, NotAllowedError, ResourceNotFoundError, right } from '@core'

import { AppointmentRepository } from '../../repositories/appointmen.repository'

export namespace AppointmentDeleteProps {
  export interface Request {
    userId: string
    appointmentId: string
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
}

export class AppointmentDelete {
  constructor(
    private readonly appointimentRespository: AppointmentRepository,
  ) {}

  async execute({ userId, appointmentId }: AppointmentDeleteProps.Request) {
    const appointment =
      await this.appointimentRespository.findById(appointmentId)

    if (!appointment) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== appointment.userId.toString()) {
      return left(new NotAllowedError())
    }

    await this.appointimentRespository.delete(appointment)

    return right({})
  }
}
