import { AppointmentRepository } from "@/application/repositories/appointmen.repository"
import { AvailableTimeRepository } from "@/application/repositories/available-time.repository"
import { ServiceRepository } from "@/application/repositories/service.repository"
import { UserRepository } from "@/application/repositories/user.repository"
import { Either, left, NotAllowedError, ResourceNotFoundError, right, UniqueEntityUUID } from "@core"

export namespace AppointmentUpdateProps {
  export interface Request {
    userId: string
    serviceId: string
    appointmentId: string
    availableTimeId: string
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
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
      return left(new ResourceNotFoundError())
    }

    if (
      userId !== user.id.toString() ||
      userId !== appointment.userId.toString() ||
      userId !== service.userId.toString() ||
      userId !== availableTime.userId.toString()
    ) {
      return left(new NotAllowedError())
    }

    appointment.serviceId = new UniqueEntityUUID(serviceId)
    appointment.availableTimeId = new UniqueEntityUUID(appointmentId)

    await this.appointimentRespository.update(appointment)

    return right({})
  }
}
