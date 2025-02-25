import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@prisma/client/runtime/library'

export namespace AppointmentTimeProps {
  export interface Props {
    name: string
    isActive: boolean
    userId: UniqueEntityUUID
    createdAt: Date
    updatedAt?: Date
  }
  export interface Id {
    timeId: string
  }
}

export class AppointmentTimeEntity extends Entity<AppointmentTimeProps.Props> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get userId() {
    return this.props.userId
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
    props: Optional<AppointmentTimeProps.Props, 'createdAt'>,
    id?: UniqueEntityUUID,
  ) {
    const time = new AppointmentTimeEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return time
  }
}
