import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@prisma/client/runtime/library'

export namespace AppointmentProps {
  export interface Props {
    status: string
    isActive: boolean
    userId: UniqueEntityUUID
    appointmentTimeId: UniqueEntityUUID
    appointmentServiceId: UniqueEntityUUID
    createdAt: Date
    updatedAt?: Date | null
  }
  export interface Id {
    Id: string
  }
}

export class AppointmentEntity extends Entity<AppointmentProps.Props> {
  get status() {
    return this.props.status
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  get userId() {
    return this.props.userId
  }

  get appointmentTimeId() {
    return this.props.appointmentTimeId
  }

  get appointmentServiceId() {
    return this.props.appointmentServiceId
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
    props: Optional<AppointmentProps.Props, 'createdAt'>,
    id?: UniqueEntityUUID,
  ) {
    const appointment = new AppointmentEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return appointment
  }
}
