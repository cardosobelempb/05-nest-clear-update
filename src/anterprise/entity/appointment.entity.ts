import { AggregateRoot } from '@/shared/enterprise/entities/aggregate-root'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { AppointmentStatus } from '@prisma/client'
import { Optional } from '@prisma/client/runtime/library'

import { AppointmentCreatedEvent } from '../events/appointment-created.event'

export namespace AppointmentProps {
  export interface Props {
    status: AppointmentStatus
    isActive: boolean
    userId: UniqueEntityUUID
    availableTimeId: UniqueEntityUUID | null
    serviceId: UniqueEntityUUID | null
    createdAt: Date
    updatedAt?: Date | null
  }
  export interface Id {
    Id: string
  }
}

export class AppointmentEntity extends AggregateRoot<AppointmentProps.Props> {
  get status() {
    return this.props.status
  }

  set status(status: AppointmentStatus) {
    this.props.status = status
  }

  get userId() {
    return this.props.userId
  }

  get availableTimeId() {
    return this.props.availableTimeId
  }

  set availableTimeId(availableTimeId: UniqueEntityUUID | null) {
    this.props.availableTimeId = availableTimeId
  }

  get serviceId() {
    return this.props.serviceId
  }

  set serviceId(serviceId: UniqueEntityUUID | null) {
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
      AppointmentProps.Props,
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
