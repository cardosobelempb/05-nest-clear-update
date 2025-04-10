import { Entity, Optional, UniqueEntityUUID } from '@core'

export namespace AvailableTimeProps {
  export interface Props {
    time: string
    isActive: boolean
    userId: UniqueEntityUUID
    createdAt: Date
    updatedAt?: Date | null
  }
  export interface Id {
    timeId: string
  }
}

export class AvailableTimeEntity extends Entity<AvailableTimeProps.Props> {
  get time() {
    return this.props.time
  }

  set time(time: string) {
    this.props.time = time
    this.touch()
  }

  get isActive() {
    return this.props.isActive
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
    props: Optional<
      AvailableTimeProps.Props,
      'createdAt' | 'updatedAt' | 'isActive'
    >,
    id?: UniqueEntityUUID,
  ) {
    const availableTime = new AvailableTimeEntity(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return availableTime
  }
}
