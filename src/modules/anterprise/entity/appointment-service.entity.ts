import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@prisma/client/runtime/library'

export namespace AppointmentServiceProps {
  export interface Props {
    name: string
    price: number
    time: Date
    isActive: boolean
    userId: UniqueEntityUUID
    appointmentTimeId: UniqueEntityUUID
    createdAt: Date
    updatedAt?: Date | null
  }
  export interface Id {
    timeId: string
  }
}

export class AppointmentServiceEntity extends Entity<AppointmentServiceProps.Props> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get price() {
    return this.props.price
  }

  set price(price: number) {
    this.props.price = price
    this.touch()
  }

  get time() {
    return this.props.time
  }

  set time(time: Date) {
    this.props.time = time
    this.touch()
  }

  get userId() {
    return this.props.userId
  }

  get appointmentTimeId() {
    return this.props.appointmentTimeId
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
    props: Optional<AppointmentServiceProps.Props, 'createdAt'>,
    id?: UniqueEntityUUID,
  ) {
    const appointmentService = new AppointmentServiceEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return appointmentService
  }
}
