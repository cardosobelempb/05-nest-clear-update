import { AggregateRoot, Optional, UniqueEntityUUID } from "../../shared/enterprise"
import { Appointment } from "../../shared/types"
import { AppointmentCreatedEvent } from "../events"

export class AppointmentEntity extends AggregateRoot<Appointment.Props> {
  get status() {
    return this.props.status
  }

  set status(status: Appointment.Status) {
    this.props.status = status
  }

  get userId() {
    return this.props.userId
  }

  get availableTimeId() {
    return this.props.availableTimeId
  }

  set availableTimeId(availableTimeId: UniqueEntityUUID) {
    this.props.availableTimeId = availableTimeId
  }

  get serviceId():UniqueEntityUUID {
    return this.props.serviceId
  }

  set serviceId(serviceId: UniqueEntityUUID) {
    this.props.serviceId = serviceId
  }

  get isActive() {
    return this.props.isActive
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<
      Appointment.Props,
      'createdAt' | 'isActive' | 'updatedAt' | 'status'
    >,
    id?: UniqueEntityUUID,
  ) {
    const appointment = new AppointmentEntity(
      {
        ...props,
        status: props.status ?? 'SCHEDULED',
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewAppointiment = !id

    if (isNewAppointiment) {
      appointment.addDomainEvent(new AppointmentCreatedEvent(appointment))
    }

    return appointment
  }
}
